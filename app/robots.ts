import type { MetadataRoute } from "next";

const SITE = "https://lindeportagency.com";

/**
 * Sin esto Google rastrea igual, pero no tiene dónde encontrar el sitemap salvo
 * que se le envíe a mano, y cada URL depende de que alguien enlace a ella.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
