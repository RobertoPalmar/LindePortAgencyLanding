"use server";

import { z } from "zod";
import { portNames } from "@/lib/ports";
import { serviceKeys } from "@/lib/services";
import { sendPortCallRequest } from "@/lib/email";

export type ContactState = { status: "idle" | "ok" | "invalid" | "error" };

const Schema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  port: z.enum(portNames),
  // Al menos uno: una solicitud sin servicio no le dice nada a operaciones.
  services: z.array(z.enum(serviceKeys)).min(1),
  requiredDate: z.coerce.date(),
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
    port: formData.get("port"),
    // `getAll`: las casillas marcadas llegan repetidas bajo el mismo nombre.
    services: formData.getAll("services"),
    requiredDate: formData.get("requiredDate"),
    message: formData.get("message") ?? "",
    _hp: formData.get("_hp") ?? "",
  });

  if (!parsed.success) return { status: "invalid" };

  try {
    const sent = await sendPortCallRequest({
      name: parsed.data.name,
      company: parsed.data.company ?? "",
      email: parsed.data.email,
      port: parsed.data.port,
      services: parsed.data.services,
      requiredDate: parsed.data.requiredDate,
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
