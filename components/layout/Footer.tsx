import type { Dictionary } from "@/lib/i18n";
import { portNames } from "@/lib/ports";

export function Footer({ d }: { d: Dictionary }) {
  const columns = [
    { head: d.footer.colAgency, items: d.footer.agency },
    { head: d.footer.colMarine, items: d.footer.marine },
    { head: d.footer.colPorts, items: [...portNames] },
  ];

  return (
    <footer className="bg-navy text-onNavy-2">
      <div className="rail pb-[42px] pt-[54px]">
        <svg
          viewBox="0 0 1296 8"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="mb-[34px] block h-2 w-full"
        >
          <path d="M0 4H1296" stroke="#24365A" />
          <circle cx="0" cy="4" r="3.5" fill="#C8102E" />
          <circle cx="1296" cy="4" r="3.5" fill="#C8102E" />
        </svg>

        <div className="flex flex-col items-start justify-between gap-10 border-b border-navy-line pb-[34px] lg:flex-row lg:gap-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/linde-logo-light.svg"
            alt="Linde Port Agency"
            className="h-[96px] w-auto lg:h-[128px]"
          />
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 text-[14px] leading-[2] sm:grid-cols-3 lg:gap-x-14">
            {columns.map((c) => (
              <div key={c.head}>
                <div className="mono mb-[10px] text-[11px] tracking-[0.18em] text-pink">{c.head}</div>
                {c.items.map((i) => (
                  <div key={i}>{i}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mono flex flex-col justify-between gap-2 pt-6 text-[11.5px] tracking-[0.12em] text-ink-mute sm:flex-row">
          <span>{d.footer.copyright}</span>
          <span>{d.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
