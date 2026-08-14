import type { Dictionary } from "@/lib/i18n";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";

export function LaunchSection({ d }: { d: Dictionary }) {
  return (
    <>
      {/* Franja separadora: evita que la banda navy pegue con la sección 01 */}
      <div aria-hidden="true" className="h-[88px] border-t border-hair bg-paper" />

      <section id="launch" className="relative overflow-hidden bg-navy text-paper">
        {/* Vídeo a sangre detrás de toda la banda, con velo navy para la legibilidad */}
        <BackgroundVideo src="/video/launch.mp4" className="saturate-[2]" />
        {/* velo al 80%: deja pasar color sin comprometer la legibilidad del texto */}
        <div aria-hidden="true" className="absolute inset-0 bg-navy/80" />
        <div className="mono absolute right-0 top-0 z-10 bg-red px-6 py-[15px] text-[12px] tracking-[0.18em] text-white">
          24 / 7 / 365
        </div>

        <div className="rail relative pb-[72px] pt-16 lg:pb-[88px] lg:pt-[76px]">
          <div className="grid items-end gap-12 lg:grid-cols-2">
            <div>
              <div className="mono text-[12px] tracking-[0.2em] text-pink">{d.launch.eyebrow}</div>
              <h2 className="mt-5 text-[30px] font-bold leading-[1.1] tracking-[-0.02em] lg:text-[40px]">
                {d.launch.title}
              </h2>
            </div>
            <p className="m-0 text-[16.5px] leading-[1.6] text-onNavy">{d.launch.body}</p>
          </div>

          <div className="mt-11 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {d.launch.services.map((item) => (
              <div
                key={item}
                className="group relative flex items-baseline gap-3 overflow-hidden border-b border-navy-line py-[13px] pl-3 transition-colors duration-[0.22s] hover:bg-white/[0.06]"
              >
                <span
                  aria-hidden="true"
                  className="absolute bottom-[1px] left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-red transition-transform duration-[0.28s] ease-out group-hover:scale-y-100"
                />
                <span aria-hidden="true" className="h-[6px] w-[6px] flex-none bg-red" />
                <span className="text-[15px] leading-[1.4] text-onNavy-3 transition-transform duration-[0.28s] ease-out group-hover:translate-x-[3px]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-[720px] border-t-2 border-red pt-[22px] text-[19px] font-semibold">
            {d.launch.singlePoint}
          </div>
        </div>
      </section>
    </>
  );
}
