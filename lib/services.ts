/**
 * Servicios que se pueden pedir en el formulario de contacto.
 *
 * Las claves no se traducen y son las que viajan en el formulario: si el rótulo
 * fuera el valor enviado, la misma solicitud llegaría en dos idiomas distintos
 * según desde dónde se rellenó, y agrupar por servicio dejaría de funcionar.
 * Las etiquetas visibles viven en `messages/`.
 */
export const serviceKeys = [
  "agency",
  "hub",
  "bunker",
  "canal",
  "launch",
  "sts",
  "underwater",
  "salvage",
  "pumping",
  "other",
] as const;

export type ServiceKey = (typeof serviceKeys)[number];
