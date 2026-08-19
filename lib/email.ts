import { CONTACT } from "@/lib/contact";

/**
 * Envío de la solicitud de escala por SendGrid.
 *
 * Se llama a la API REST con `fetch` en vez de usar `@sendgrid/mail`: el SDK
 * depende de módulos de Node que no existen en el runtime edge de Cloudflare,
 * donde vive el Server Action del formulario.
 */

export type RequestPayload = {
  name: string;
  company: string;
  email: string;
  vessel: string;
  port: string;
  eta: Date;
  message: string;
};

/**
 * En Cloudflare las variables llegan por el contexto de la request, no por el
 * entorno del proceso. `next dev` no tiene ese contexto, así que hace falta
 * mirar en los dos sitios o el formulario solo funcionaría en uno de ellos.
 */
async function readEnv(name: string): Promise<string | undefined> {
  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    const value = (getRequestContext().env as Record<string, unknown>)[name];
    if (typeof value === "string" && value) return value;
  } catch {
    // fuera del runtime de Pages; seguimos con process.env
  }
  const value = process.env[name];
  return value || undefined;
}

/** El nombre del barco y el mensaje los escribe un desconocido: van escapados. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatEta(eta: Date): string {
  // ISO recortado a la fecha: un ETA con hora local induce a error cuando quien
  // lo lee está en otro huso que quien lo escribió.
  return eta.toISOString().slice(0, 10);
}

function buildRows(data: RequestPayload): Array<[string, string]> {
  return [
    ["Solicitante", data.name],
    ["Empresa", data.company || "—"],
    ["Correo", data.email],
    ["Buque", data.vessel],
    ["Puerto", data.port],
    ["ETA", formatEta(data.eta)],
    ["Mensaje", data.message || "—"],
  ];
}

function buildText(data: RequestPayload): string {
  return buildRows(data)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

function buildHtml(data: RequestPayload): string {
  const rows = buildRows(data)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #e6e6e6;font:600 12px/1.4 monospace;letter-spacing:.12em;text-transform:uppercase;color:#6b7280;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #e6e6e6;font:400 15px/1.5 system-ui,sans-serif;color:#0f172a">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;background:#f4f4f5;padding:24px">
    <table role="presentation" style="width:100%;max-width:640px;margin:0 auto;border-collapse:collapse;background:#ffffff">
      <tr>
        <td style="background:#0f1c34;padding:20px 24px">
          <div style="font:600 12px/1.4 monospace;letter-spacing:.18em;color:#C8102E">LINDE PORT AGENCY</div>
          <div style="font:700 20px/1.3 system-ui,sans-serif;color:#ffffff;margin-top:6px">Nueva solicitud de escala</div>
        </td>
      </tr>
      ${rows}
    </table>
  </body>
</html>`;
}

/** `true` si SendGrid aceptó el envío. El detalle del fallo va al log. */
export async function sendPortCallRequest(data: RequestPayload): Promise<boolean> {
  const apiKey = await readEnv("SENDGRID_API_KEY");
  if (!apiKey) {
    console.error("[linde] falta SENDGRID_API_KEY: la solicitud no se envió");
    return false;
  }

  const to = (await readEnv("CONTACT_TO")) ?? CONTACT.email;
  // El remitente tiene que estar verificado en SendGrid; no puede ser el correo
  // del visitante o el envío sale rechazado por SPF/DMARC.
  const from = (await readEnv("CONTACT_FROM")) ?? `Linde Port Agency <no-reply@${to.split("@")[1]}>`;
  const match = from.match(/^\s*(.*?)\s*<(.+)>\s*$/);

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: match ? { name: match[1], email: match[2] } : { email: from.trim() },
      // Responder desde el correo va al armador, no a la agencia.
      reply_to: { email: data.email, name: data.name },
      subject: `Solicitud de escala · ${data.vessel} · ${data.port}`,
      // SendGrid exige el texto plano antes del HTML.
      content: [
        { type: "text/plain", value: buildText(data) },
        { type: "text/html", value: buildHtml(data) },
      ],
    }),
  });

  if (res.status !== 202) {
    console.error("[linde] SendGrid rechazó el envío", res.status, await res.text());
    return false;
  }

  return true;
}
