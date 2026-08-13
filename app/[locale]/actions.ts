"use server";

import { z } from "zod";
import { portNames } from "@/lib/ports";

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
    // TODO: enviar a la mesa de operaciones + copia a cotizaciones.
    // Los correos reales están pendientes de confirmar por el cliente.
    console.info("[linde] solicitud de escala", {
      ...parsed.data,
      eta: parsed.data.eta.toISOString(),
      _hp: undefined,
    });
    return { status: "ok" };
  } catch {
    return { status: "error" };
  }
}
