import { CONTACT } from "@/lib/contact";
import type { ServiceKey } from "@/lib/services";

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
  port: string;
  services: readonly ServiceKey[];
  requiredDate: Date;
  message: string;
};

/**
 * El correo lo lee la agencia, no quien rellena el formulario, así que va
 * siempre en español aunque la solicitud entre por la versión en inglés.
 */
const SERVICE_LABELS: Record<ServiceKey, string> = {
  agency: "Agencia completa",
  hub: "Hub Agency",
  bunker: "Coordinación de bunker",
  canal: "Tránsitos del Canal",
  launch: "Launch 24/7",
  sts: "Lightering STS",
  underwater: "Servicios submarinos",
  salvage: "Salvamento",
  pumping: "Bombeo",
  other: "Otros",
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

/** El nombre de la empresa y el mensaje los escribe un desconocido: van escapados. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(value: Date): string {
  // ISO recortado al día: una fecha con hora induce a error cuando quien la
  // lee está en otro huso que quien la escribió.
  return value.toISOString().slice(0, 10);
}

function formatServices(services: readonly ServiceKey[]): string {
  return services.map((key) => SERVICE_LABELS[key] ?? key).join(", ");
}

function buildRows(data: RequestPayload): Array<[string, string]> {
  return [
    ["Solicitante", data.name],
    ["Empresa", data.company || "—"],
    ["Correo", data.email],
    ["Puerto", data.port],
    ["Fecha requerida", formatDate(data.requiredDate)],
    ["Servicios", formatServices(data.services)],
    ["Mensaje", data.message || "—"],
  ];
}

function buildText(data: RequestPayload): string {
  return buildRows(data)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

function buildHtml(data: RequestPayload, logoUrl: string): string {
  const rows = buildRows(data)
    .map(
      ([label, value], i) => `
              <tr${i % 2 ? ' style="background:#fafafa"' : ""}>
                <th align="left" scope="row" style="width:28%;padding:12px 20px;border-bottom:1px solid #e6e6e6;font:600 11px/1.5 'Courier New',monospace;letter-spacing:.12em;text-transform:uppercase;color:#6b7280;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</th>
                <td style="width:72%;padding:12px 20px;border-bottom:1px solid #e6e6e6;font:400 15px/1.6 Arial,Helvetica,sans-serif;color:#0f172a;vertical-align:top">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
              </tr>`,
    )
    .join("");

  // Tablas y estilos en línea, no flex ni clases: Outlook descarta el CSS
  // embebido y no implementa la mitad del layout moderno.
  return `<!doctype html>
<html lang="es">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:24px 12px;background:#f4f4f5">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:640px;border-collapse:collapse;background:#ffffff;border:1px solid #e2e2e5">

            <tr>
              <td align="center" style="background:#0f1c34;padding:28px 24px 24px">
                <img src="${logoUrl}" width="140" alt="Linde Port Agency" style="display:block;width:140px;max-width:140px;height:auto;border:0;margin:0 auto 14px">
                <div style="font:700 21px/1.3 Arial,Helvetica,sans-serif;color:#ffffff">Nueva solicitud de escala</div>
                <div style="font:700 13px/1.5 Arial,Helvetica,sans-serif;letter-spacing:.14em;color:#E8536B;margin-top:10px">FORMULARIO DEL SITIO WEB</div>
              </td>
            </tr>

            <tr>
              <td style="padding:0">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
                  <thead>
                    <tr>
                      <th align="left" scope="col" style="width:28%;padding:11px 20px;background:#eef0f3;border-bottom:2px solid #0f1c34;font:700 10.5px/1.5 'Courier New',monospace;letter-spacing:.16em;text-transform:uppercase;color:#0f1c34">Dato</th>
                      <th align="left" scope="col" style="width:72%;padding:11px 20px;background:#eef0f3;border-bottom:2px solid #0f1c34;font:700 10.5px/1.5 'Courier New',monospace;letter-spacing:.16em;text-transform:uppercase;color:#0f1c34">Detalle</th>
                    </tr>
                  </thead>
                  <tbody>${rows}
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 20px 22px;font:400 13px/1.6 Arial,Helvetica,sans-serif;color:#6b7280">
                Responda a este correo para contestarle directamente a
                <a href="mailto:${escapeHtml(data.email)}" style="color:#C8102E">${escapeHtml(data.email)}</a>.
              </td>
            </tr>

          </table>
        </td>
      </tr>
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

  // El logo se enlaza en absoluto: los clientes de correo no resuelven rutas
  // relativas, y el SVG de la web no lo renderiza ni Gmail ni Outlook.
  const site = (await readEnv("SITE_URL")) ?? "https://lindeportagency.com";
  const logoUrl = `${site.replace(/\/$/, "")}/brand/linde-logo-email.png`;

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
      subject: `Solicitud de escala · ${data.port} · ${formatDate(data.requiredDate)}`,
      // SendGrid exige el texto plano antes del HTML.
      content: [
        { type: "text/plain", value: buildText(data) },
        { type: "text/html", value: buildHtml(data, logoUrl) },
      ],
    }),
  });

  if (res.status !== 202) {
    console.error("[linde] SendGrid rechazó el envío", res.status, await res.text());
    return false;
  }

  return true;
}
