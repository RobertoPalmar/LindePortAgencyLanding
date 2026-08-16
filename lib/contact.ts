/**
 * Datos de contacto de la agencia.
 *
 * Viven acá y no en los diccionarios porque un teléfono no se traduce. Repetirlos
 * por idioma es la vía más corta a que un día el sitio en inglés muestre un número
 * viejo: se corrige uno, se olvida el otro y nadie lo nota hasta que un armador
 * llama a un número muerto. Las etiquetas sí se traducen; el dato, no.
 */
export const CONTACT = {
  /** Aruba (+297). Agrupado 3-4 como se marca localmente. */
  phone: "+297 744 6677",
  /** `tel:` exige el número sin espacios ni separadores. */
  phoneHref: "tel:+2977446677",
  email: "Info@lindeportagency.com",
  emailHref: "mailto:Info@lindeportagency.com",
};
