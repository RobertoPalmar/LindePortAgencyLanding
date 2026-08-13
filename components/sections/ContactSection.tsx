"use client";

import { useFormState, useFormStatus } from "react-dom";
import type { Dictionary } from "@/lib/i18n";
import { portNames } from "@/lib/ports";
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
              className="pointer-events-none absolute bottom-[-24px] right-[26%] h-[280px] w-[200px]"
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
                  <div className="mt-[7px] text-[17px] font-semibold">{b.value}</div>
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
              <Field name="vessel" label={f.vessel} required />
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
              <Field name="eta" label={f.eta} type="date" required />
            </div>

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
