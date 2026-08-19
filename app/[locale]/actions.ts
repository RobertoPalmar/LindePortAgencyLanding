"use server";

import { z } from "zod";
import { portNames } from "@/lib/ports";
import { sendPortCallRequest } from "@/lib/email";

export type ContactState = { status: "idle" | "ok" | "invalid" | "error" };

const Schema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  vessel: z.string().min(2),
  port: z.enum(portNames),
  eta: z.coerce.date(),
  message: z.string().max(2000).optional(),
  _hp: z.string().max(0), // honeypot
});

export async function submitRequest(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = Schema.safeParse({
    name: formData.get("name"),
    company: formData.get("company") ?? "",
    email: formData.get("email"),
    vessel: formData.get("vessel"),
    port: formData.get("port"),
    eta: formData.get("eta"),
    message: formData.get("message") ?? "",
    _hp: formData.get("_hp") ?? "",
  });

  if (!parsed.success) return { status: "invalid" };

  try {
    const sent = await sendPortCallRequest({
      name: parsed.data.name,
      company: parsed.data.company ?? "",
      email: parsed.data.email,
      vessel: parsed.data.vessel,
      port: parsed.data.port,
      eta: parsed.data.eta,
      message: parsed.data.message ?? "",
    });

    // Un "gracias" con el correo sin salir deja al armador esperando respuesta
    // a algo que nadie recibió: si el envío falla, el formulario lo dice.
    return { status: sent ? "ok" : "error" };
  } catch (err) {
    console.error("[linde] error enviando la solicitud", err);
    return { status: "error" };
  }
}
