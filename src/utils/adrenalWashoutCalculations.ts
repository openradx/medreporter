export function calcAbsoluteAdrenalWashout(
  nonEnhanced: number,
  portalVenous: number,
  delayed: number
): number {
  return ((portalVenous - delayed) / (portalVenous - nonEnhanced)) * 100
}

export function calcRelativeAdrenalWashout(portalVenous: number, delayed: number): number {
  return ((portalVenous - delayed) / portalVenous) * 100
}
