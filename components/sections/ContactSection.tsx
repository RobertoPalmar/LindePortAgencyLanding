"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import type { Dictionary } from "@/lib/i18n";
import { portNames } from "@/lib/ports";
import { serviceKeys, type ServiceKey } from "@/lib/services";
import { submitRequest, type ContactState } from "@/app/[locale]/actions";

const initial: ContactState = { status: "idle" };

/** 07 — Contacto. Server Action + Zod; estados idle / enviando / éxito / error. */
export function ContactSection({ d }: { d: Dictionary }) {
  const [state, formAction] = useFormState(submitRequest, initial);
  const f = d.contact.form;

  return (
    <section id="contact" className="border-t border-hair bg-white">
      <div className="rail band-y">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-0">
          {/* Columna izquierda: copy + datos de contacto, con la retícula de carta náutica */}
          <div className="relative overflow-hidden lg:pr-[52px]">
            {/* Ancla de línea: misma familia gráfica que la rosa de los vientos del brochure */}
            <svg
              viewBox="0 0 200 280"
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[-24px] right-[26%] h-[280px] w-[200px] rotate-[14deg]"
              fill="none"
              stroke="#DCD8CC"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* arganeo */}
              <circle cx="100" cy="26" r="14" />
              {/* caña */}
              <path d="M100 40v192" />
              {/* cepo con sus topes */}
              <path d="M52 74h96M52 66v16M148 66v16" />
              {/* brazos */}
              <path d="M100 232C60 232 34 212 30 180M100 232c40 0 66-20 70-52" />
              {/* uñas */}
              <path d="M30 180l-16-34 34 20zM170 180l16-34-34 20z" />
              {/* cruz */}
              <path d="M86 224q14 16 28 0" />
              <rect x="96" y="70" width="8" height="8" fill="#C8102E" stroke="none" />
            </svg>

            <div className="mono relative text-[12px] tracking-[0.2em] text-red">
              {d.contact.eyebrow}
            </div>
            <h2 className="mt-5 text-[28px] font-bold leading-[1.12] tracking-[-0.015em] lg:text-[36px]">
              {d.contact.title}
            </h2>
            <p className="mt-5 max-w-[460px] text-[16.5px] leading-[1.6] text-ink-soft">
              {d.contact.body}
            </p>
            <div className="mt-[34px] flex flex-col gap-5">
              {d.contact.blocks.map((b) => (
                <div key={b.label} className="border-b border-hair-2 pb-4">
                  <div className="mono text-[11px] tracking-[0.18em] text-ink-mute">{b.label}</div>
                  {/*
                   * Cada canal va enlazado: en el móvil se marca o se escribe de
                   * un toque, que es desde donde se lee una web de agencia.
                   */}
                  <a
                    href={b.href}
                    className="mt-[7px] inline-block text-[17px] font-semibold transition-colors duration-[0.18s] hover:text-red"
                  >
                    {b.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Panel del formulario */}
          <form action={formAction} className="bg-panel px-6 py-10 lg:px-[52px] lg:py-14">
            <div className="grid gap-[18px] sm:grid-cols-2">
              <Field name="name" label={f.name} required />
              <Field name="company" label={f.company} />
              <Field name="email" label={f.email} type="email" required />
              <label className="flex flex-col gap-2">
                <span className="field-label">{f.port}</span>
                <select name="port" required defaultValue={portNames[0]} className="field">
                  {portNames.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>
              <TodayField name="requiredDate" label={f.requiredDate} />
            </div>

            <ServicePicker f={f} />

            <label className="mt-[18px] flex flex-col gap-2">
              <span className="field-label">{f.message}</span>
              <textarea name="message" rows={4} className="field resize-y" />
            </label>

            {/* honeypot */}
            <input
              type="text"
              name="_hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute h-0 w-0 opacity-0"
            />

            <SubmitButton idle={f.send} sending={f.sending} />

            {state.status === "ok" && (
              <p
                role="status"
                className="mt-[14px] border-l-[3px] border-success-line bg-success-bg px-[14px] py-3 text-[14px] text-navy"
              >
                {f.sent}
              </p>
            )}
            {state.status === "invalid" && (
              <p
                role="alert"
                className="mt-[14px] border-l-[3px] border-red bg-[#F7E7E9] px-[14px] py-3 text-[14px] text-navy"
              >
                {f.required}
              </p>
            )}
            {state.status === "error" && (
              <p
                role="alert"
                className="mt-[14px] border-l-[3px] border-red bg-[#F7E7E9] px-[14px] py-3 text-[14px] text-navy"
              >
                {f.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/**
 * Servicios en desplegable. Mismo patrón que el selector de idioma del brochure:
 * cerrar con Escape y con clic fuera, porque un panel que solo se cierra con su
 * propio botón deja al usuario atrapado si se abre por error.
 *
 * Las casillas siguen siendo `input` reales dentro del panel: así el formulario
 * las serializa solo, sin campos ocultos que sincronizar a mano.
 */
function ServicePicker({ f }: { f: Dictionary["contact"]["form"] }) {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<ServiceKey[]>([]);
  const wrap = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const toggle = (key: ServiceKey) =>
    setPicked((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  return (
    <div className="mt-[18px] flex flex-col gap-2">
      <span className="field-label" id="services-label">
        {f.servicesLabel}
      </span>

      <div ref={wrap} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="true"
          aria-labelledby="services-label services-value"
          className="field flex w-full items-start justify-between gap-3 text-left"
        >
          {/*
           * Los badges van dentro del disparador como `span`: un botón dentro de
           * otro botón es HTML inválido, así que quitar un servicio se hace
           * desmarcándolo en el panel, no con una x en la etiqueta.
           */}
          <span id="services-value" className="flex flex-wrap items-center gap-[6px]">
            {picked.length === 0 ? (
              <span className="text-ink-mute">{f.servicesPlaceholder}</span>
            ) : (
              picked.map((key) => (
                <span
                  key={key}
                  className="border border-navy/15 bg-panel px-[9px] py-[3px] text-[12.5px] leading-[1.5] text-navy"
                >
                  {f.services[key]}
                </span>
              ))
            )}
          </span>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            aria-hidden="true"
            className="mt-[7px] flex-none transition-transform duration-[0.18s]"
            style={{ transform: open ? "rotate(180deg)" : "none" }}
          >
            <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>

        <div
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-[5] max-h-[260px] overflow-y-auto border border-hair bg-white py-2 shadow-picker transition-[opacity,transform] duration-[0.18s]"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(-6px)",
            pointerEvents: open ? "auto" : "none",
          }}
        >
          {serviceKeys.map((key) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-[10px] px-[14px] py-[9px] text-[15px] transition-colors duration-[0.18s] hover:bg-panel"
            >
              <input
                type="checkbox"
                name="services"
                value={key}
                checked={picked.includes(key)}
                onChange={() => toggle(key)}
                className="h-[16px] w-[16px] flex-none accent-red"
              />
              <span>{f.services[key]}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="field-label">{label}</span>
      <input type={type} name={name} required={required} className="field" />
    </label>
  );
}

/**
 * Fecha con el día de hoy ya puesto.
 *
 * El valor se asigna al montar y no en el render: el HTML lo genera el servidor
 * en UTC y quien rellena el formulario puede estar en otro día, así que pintarlo
 * directamente daría un desajuste de hidratación —y, de noche, una fecha que no
 * es la de quien mira la pantalla—.
 */
function TodayField({ name, label }: { name: string; label: string }) {
  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!input.current || input.current.value) return;
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    input.current.value = local.toISOString().slice(0, 10);
  }, []);

  return (
    <label className="flex flex-col gap-2">
      <span className="field-label">{label}</span>
      <input ref={input} type="date" name={name} required className="field" />
    </label>
  );
}

function SubmitButton({ idle, sending }: { idle: string; sending: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-[22px] w-full bg-red px-6 py-[18px] text-[13px] font-semibold tracking-[0.1em] text-white transition-[background,transform] duration-200 hover:-translate-y-[2px] hover:bg-red-deep disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-red"
    >
      {pending ? sending : idle}
    </button>
  );
}
