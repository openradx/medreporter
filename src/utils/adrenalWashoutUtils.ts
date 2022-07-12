const calcAbsoluteAdrenalWashout = (
  nonEnhanced: number,
  portalVenous: number,
  delayed: number
): number | null => {
  if (nonEnhanced >= portalVenous) {
    return null
  }
  return ((portalVenous - delayed) / (portalVenous - nonEnhanced)) * 100
}

const calcRelativeAdrenalWashout = (portalVenous: number, delayed: number): number | null => {
  if (portalVenous === 0) {
    return null
  }
  return ((portalVenous - delayed) / portalVenous) * 100
}

export enum Suggestion {
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

export type AdrenalWashoutResult = {
  suggestion: Suggestion
  absoluteWashout: number | null
  relativeWashout: number | null
}

export const calcAdrenalWashout = (
  nonEnhanced: number | null,
  portalVenous: number | null,
  delayed: number | null
): AdrenalWashoutResult => {
  let absoluteWashout: number | null = null
  if (nonEnhanced !== null && portalVenous !== null && delayed !== null) {
    absoluteWashout = calcAbsoluteAdrenalWashout(nonEnhanced, portalVenous, delayed)
  }

  let relativeWashout: number | null = null
  if (portalVenous !== null && delayed !== null) {
    relativeWashout = calcRelativeAdrenalWashout(portalVenous, delayed)
  }

  let suggestion: Suggestion = Suggestion.NoSuggestionPossible

  if (nonEnhanced !== null) {
    if (nonEnhanced < 0) {
      suggestion = Suggestion.DensityLowerZeroAdenoma
    } else if (nonEnhanced < 10) {
      suggestion = Suggestion.DensityLowerTenAdenoma
    } else if (nonEnhanced >= 43) {
      suggestion = Suggestion.HighDensityMalignancy
    }
  }

  if (suggestion === Suggestion.NoSuggestionPossible) {
    if (portalVenous != null && portalVenous >= 130) {
      suggestion = Suggestion.HighEnhancementPheochromocytoma
    } else if (absoluteWashout !== null) {
      if (absoluteWashout >= 60) {
        suggestion = Suggestion.HighAbsoluteWashoutAdenoma
      } else {
        suggestion = Suggestion.LowAbsoluteWashoutAlternative
      }
    } else if (relativeWashout !== null) {
      if (relativeWashout >= 40) {
        suggestion = Suggestion.HighRelativeWashoutAdenoma
      } else {
        suggestion = Suggestion.LowRelativeWashoutAlternative
      }
    }
  }

  return {
    suggestion,
    absoluteWashout,
    relativeWashout,
  }
}
