export const calcAbsoluteAdrenalWashout = (
  nonEnhanced: number | null,
  portalVenous: number | null,
  delayed: number | null
): number | null => {
  if (nonEnhanced === null || portalVenous === null || delayed === null) {
    return null
  }

  if (nonEnhanced >= portalVenous) {
    return null
  }
  return ((portalVenous - delayed) / (portalVenous - nonEnhanced)) * 100
}

export const calcRelativeAdrenalWashout = (
  portalVenous: number | null,
  delayed: number | null
): number | null => {
  if (portalVenous === null || delayed === null) {
    return null
  }

  if (portalVenous === 0) {
    return null
  }
  return ((portalVenous - delayed) / portalVenous) * 100
}

export enum Suggestion {
  MissingValues = "missingValues",
  NoSuggestionPossible = "noSuggestionPossible",
  DensityLowerZeroAdenoma = "densityLowerZeroAdenoma",
  DensityLowerTenAdenoma = "densityLowerTenAdenoma",
  HighDensityMalignancy = "highDensityMalignancy",
  HighEnhancementPheochromocytoma = "highEnhancementPheochromocytoma",
  HighAbsoluteWashoutAdenoma = "highAbsoluteWashoutAdenoma",
  LowAbsoluteWashoutAlternative = "lowAbsoluteWashoutAdenoma",
  HighRelativeWashoutAdenoma = "highRelativeWashoutAdenoma",
  LowRelativeWashoutAlternative = "lowRelativeWashoutAdenoma",
}

export const makeSuggestion = (
  nonEnhanced: number | null,
  portalVenous: number | null,
  delayed: number | null,
  absoluteWashout: number | null,
  relativeWashout: number | null
): Suggestion => {
  if (nonEnhanced === null && portalVenous === null && delayed === null) {
    return Suggestion.MissingValues
  }

  if (nonEnhanced !== null) {
    if (nonEnhanced < 0) {
      return Suggestion.DensityLowerZeroAdenoma
    }

    if (nonEnhanced < 10) {
      return Suggestion.DensityLowerTenAdenoma
    }

    if (nonEnhanced >= 43) {
      return Suggestion.HighDensityMalignancy
    }
  }

  if (portalVenous != null && portalVenous >= 130) {
    return Suggestion.HighEnhancementPheochromocytoma
  }

  if (absoluteWashout !== null) {
    if (absoluteWashout >= 60) {
      return Suggestion.HighAbsoluteWashoutAdenoma
    }
    // absoluteWashout < 60
    return Suggestion.LowAbsoluteWashoutAlternative
  }

  if (relativeWashout !== null) {
    if (relativeWashout >= 40) {
      return Suggestion.HighRelativeWashoutAdenoma
    }
    // relativeWashout < 40
    return Suggestion.LowRelativeWashoutAlternative
  }

  return Suggestion.NoSuggestionPossible
}
