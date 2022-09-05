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
  DensityLowerZeroAdenoma = "suggestionDensityLowerZeroAdenoma",
  DensityLowerTenAdenoma = "suggestionDensityLowerTenAdenoma",
  HighDensityMalignancy = "suggestionHighDensityMalignancy",
  HighEnhancementPheochromocytoma = "suggestionHighEnhancementPheochromocytoma",
  HighAbsoluteWashoutAdenoma = "suggestionHighAbsoluteWashoutAdenoma",
  LowAbsoluteWashoutAlternative = "suggestionLowAbsoluteWashoutAdenoma",
  HighRelativeWashoutAdenoma = "suggestionHighRelativeWashoutAdenoma",
  LowRelativeWashoutAlternative = "suggetionLowRelativeWashoutAdenoma",
}

export const makeAdrenalWashoutSuggestion = (
  nonEnhanced: number | null,
  portalVenous: number | null,
  delayed: number | null
): AdrenalWashoutSuggestion[] => {
  const suggestions: AdrenalWashoutSuggestion[] = []

  if (nonEnhanced === null && portalVenous === null && delayed === null) {
    suggestions.push(AdrenalWashoutSuggestion.MissingValues)
    return suggestions
  }

  if (nonEnhanced !== null) {
    if (nonEnhanced < 0) {
      suggestions.push(AdrenalWashoutSuggestion.DensityLowerZeroAdenoma)
    } else if (nonEnhanced < 10) {
      suggestions.push(AdrenalWashoutSuggestion.DensityLowerTenAdenoma)
    } else if (nonEnhanced >= 43) {
      suggestions.push(AdrenalWashoutSuggestion.HighDensityMalignancy)
    }
  }

  if (portalVenous != null && portalVenous >= 130) {
    suggestions.push(AdrenalWashoutSuggestion.HighEnhancementPheochromocytoma)
  }

  if (nonEnhanced !== null && portalVenous !== null && delayed !== null) {
    const absoluteWashout = calcAbsoluteAdrenalWashout(nonEnhanced, portalVenous, delayed)
    if (absoluteWashout !== null) {
      if (absoluteWashout >= 60) {
        suggestions.push(AdrenalWashoutSuggestion.HighAbsoluteWashoutAdenoma)
      } else {
        // absoluteWashout < 60
        suggestions.push(AdrenalWashoutSuggestion.LowAbsoluteWashoutAlternative)
      }
    }
  }

  if (portalVenous !== null && delayed !== null) {
    const relativeWashout = calcRelativeAdrenalWashout(portalVenous, delayed)
    if (relativeWashout !== null) {
      if (relativeWashout >= 40) {
        suggestions.push(AdrenalWashoutSuggestion.HighRelativeWashoutAdenoma)
      } else {
        // relativeWashout < 40
        suggestions.push(AdrenalWashoutSuggestion.LowRelativeWashoutAlternative)
      }
    }
  }

  if (suggestions.length === 0) {
    suggestions.push(AdrenalWashoutSuggestion.NoSuggestionPossible)
  }

  return suggestions
}
