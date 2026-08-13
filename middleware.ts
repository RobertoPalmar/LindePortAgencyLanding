import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

/** Negociación de locale: /ruta sin prefijo → /es (o /en si el navegador lo pide). */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const accept = request.headers.get("accept-language") ?? "";
  const preferred = locales.find((l) => accept.toLowerCase().startsWith(l)) ?? defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|brand|photos|brochure|og|favicon.ico|.*\\..*).*)"],
};
