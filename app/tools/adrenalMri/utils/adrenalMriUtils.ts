export const calcSignalDropout = (inPhaseAdrenal: number, oppPhaseAdrenal: number): number =>
  (100 * (inPhaseAdrenal - oppPhaseAdrenal)) / inPhaseAdrenal

export const calcAdrenalToSpleenRatio = (
  inPhaseAdrenal: number,
  oppPhaseAdrenal: number,
  inPhaseSpleen: number,
  oppPhaseSpleen: number
): number => oppPhaseAdrenal / oppPhaseSpleen / (inPhaseAdrenal / inPhaseSpleen)

export enum AdrenalMriSuggestion {
  MissingValues = "AdrenalMri.missingValues",
  NoSuggestionPossible = "AdrenalMri.noSuggestionPossible",
  CsiAdenoma = "AdrenalMri.csiAdenoma",
  CsiUnclear = "AdrenalMri.csiUnclear",
  ToSpleenAdenoma = "AdrenalMri.toSpleenAdenoma",
  ToSpleenUnclear = "AdrenalMri.toSpleenUnclear",
}

export const makeAdrenalMriSuggestion = (
  inPhaseAdrenal: number | null,
  oppPhaseAdrenal: number | null,
  inPhaseSpleen: number | null,
  oppPhaseSpleen: number | null
): AdrenalMriSuggestion[] => {
  const suggestions: AdrenalMriSuggestion[] = []

  if (inPhaseAdrenal === null || oppPhaseAdrenal === null) {
    suggestions.push(AdrenalMriSuggestion.MissingValues)
    return suggestions
  }

  if (inPhaseAdrenal !== null && oppPhaseAdrenal !== null) {
    const signalDropout = calcSignalDropout(inPhaseAdrenal, oppPhaseAdrenal)
    if (signalDropout > 16.5) {
      suggestions.push(AdrenalMriSuggestion.CsiAdenoma)
    } else {
      //signalDropout <= 16.5
      suggestions.push(AdrenalMriSuggestion.CsiUnclear)
    }
  }

  if (inPhaseSpleen !== null && oppPhaseSpleen !== null) {
    const adrenalToSpleenRatio = calcAdrenalToSpleenRatio(
      inPhaseAdrenal,
      oppPhaseAdrenal,
      inPhaseSpleen,
      oppPhaseSpleen
    )
    if (adrenalToSpleenRatio < 0.71) {
      suggestions.push(AdrenalMriSuggestion.ToSpleenAdenoma)
    } else {
      //adrenalToSpleenRatio >= 0.71
      suggestions.push(AdrenalMriSuggestion.ToSpleenUnclear)
    }
  }

  return suggestions
}
