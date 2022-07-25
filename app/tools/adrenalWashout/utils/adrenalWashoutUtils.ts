export const calcAbsoluteAdrenalWashout = (
  nonEnhanced: number,
  portalVenous: number,
  delayed: number
): number => ((portalVenous - delayed) / (portalVenous - nonEnhanced)) * 100

export const calcRelativeAdrenalWashout = (portalVenous: number, delayed: number): number =>
  ((portalVenous - delayed) / portalVenous) * 100

export enum AdrenalWashoutSuggestion {
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

export const makeAdrenalWashoutSuggestion = (
  nonEnhanced: number | null,
  portalVenous: number | null,
  delayed: number | null
): AdrenalWashoutSuggestion => {
  if (nonEnhanced === null && portalVenous === null && delayed === null) {
    return AdrenalWashoutSuggestion.MissingValues
  }

  if (nonEnhanced !== null) {
    if (nonEnhanced < 0) {
      return AdrenalWashoutSuggestion.DensityLowerZeroAdenoma
    }

    if (nonEnhanced < 10) {
      return AdrenalWashoutSuggestion.DensityLowerTenAdenoma
    }

    if (nonEnhanced >= 43) {
      return AdrenalWashoutSuggestion.HighDensityMalignancy
    }
  }

  if (portalVenous != null && portalVenous >= 130) {
    return AdrenalWashoutSuggestion.HighEnhancementPheochromocytoma
  }

  if (nonEnhanced !== null && portalVenous !== null && delayed !== null) {
    const absoluteWashout = calcAbsoluteAdrenalWashout(nonEnhanced, portalVenous, delayed)
    if (absoluteWashout !== null) {
      if (absoluteWashout >= 60) {
        return AdrenalWashoutSuggestion.HighAbsoluteWashoutAdenoma
      }
      // absoluteWashout < 60
      return AdrenalWashoutSuggestion.LowAbsoluteWashoutAlternative
    }
  }

  if (portalVenous !== null && delayed !== null) {
    const relativeWashout = calcRelativeAdrenalWashout(portalVenous, delayed)
    if (relativeWashout !== null) {
      if (relativeWashout >= 40) {
        return AdrenalWashoutSuggestion.HighRelativeWashoutAdenoma
      }
      // relativeWashout < 40
      return AdrenalWashoutSuggestion.LowRelativeWashoutAlternative
    }
  }

  return AdrenalWashoutSuggestion.NoSuggestionPossible
}
