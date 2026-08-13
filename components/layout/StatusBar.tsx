import type { Dictionary } from "@/lib/i18n";

export function StatusBar({ d }: { d: Dictionary }) {
  return (
    <div className="bg-navy text-onNavy-2">
      <div className="rail flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-[9px] font-mono text-[11.5px] tracking-[0.14em]">
        <span>{d.statusBar.ports}</span>
        <span className="flex items-center gap-[10px]">
          <span
            aria-hidden="true"
            className="inline-block h-[7px] w-[7px] animate-pulse2 rounded-full bg-red"
          />
          {d.statusBar.deskOpen}
        </span>
      </div>
    </div>
  );
}
