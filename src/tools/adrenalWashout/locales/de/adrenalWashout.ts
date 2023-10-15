export default {
  AdrenalWashout: {
    /**
     * Structure
     */
    toolTitle: "Nebennieren CT (Washout)",
    toolHint:
      "Charakterisierung von unklaren Nebennierenläsionen zur Erkennung von Nebennierenadenomen in der CT.\n",
    groupLabelDensity: "Dichte (HE)",
    inputLabelNonEnhanced: "Native Phase",
    inputLabelPortalVenous: "Venöse Phase",
    inputLabelDelayed: "Spätphase",
    hintRoiPlacement:
      "Die Messung (ROI) sollte etwa zwei Drittel der Läsion abdecken ohne die Peripherie miteinzubeziehen.\n",
    hintPreferAbsoluteWashout:
      "Wenn möglich sollte das absolute Washout gegenüber dem relativen Washout bevorzugt werden.\n",

    /**
     * Report
     */
    textAbsoluteWashoutRequirements:
      "Absolutes Washout benötigt eine native, portal-venöse und späte Phase.\n",
    textRelativeWashoutRequirements:
      "Relatives Washout benötigt eine portal-venöse und späte Phase.\n",
    resultRelativeWashoutInvalid: "Relatives Washout: Invalide Dichtewerte",
    resultAbsoluteWashoutInvalid: "Absolutes Washout: Invalide Dichtewerte",
    resultRelativeWashoutWithValue: "Relatives Washout: {{value}}%",
    resultAbsoluteWashoutWithValue: "Absolutes Washout: {{value}}%",
    missingValues: "Fehlende Angabe von Dichtewerten.",
    noSuggestionPossible:
      "Mit den eingegebenen Werten ist keine Einschätzung der Nebennierenläsion möglich. Eine ergänzende Bildgebung, wie FDG-PET/CT oder MRT mit In-Phase (IP) und Out-of-Phase (OOP) Sequenzen sollte erwogen werden.\n",
    suggestionDensityLowerZeroAdenoma:
      "Eine Nebennierenläsion mit einer Dichte < 0 HE in einer nativen Phase ist hoch spezifisch für ein fettreiches Adenom (47% sensitiv, 100% spezifisch).\n",
    suggestionDensityLowerTenAdenoma:
      "Eine Nebennierenläsion mit einer Dichte < 10 HE in einer nativen Phase ist recht spezifisch für ein fettreiches Adneom (71% sensitiv, 98% spezifisch).\n",
    suggestionHighDensityMalignancy:
      "Eine Nebennierenläsion mit einer Dichte > 43 HE in einem nativen CT, die weder verkalkt noch hämorrhagisch transformiert ist, ist malignomsuspekt unabhängig von dem Washout. Anstatt das Washout zu beurteilen kann ein FDG-PET/CT erwogen werden.\n",
    suggestionHighEnhancementPheochromocytoma:
      "Eine Nebennierenläsion, die um > 130 HE anreichert ist verdächtig auf ein hypervaskularisiertes Phäochromozytom.\n",
    suggestionHighAbsoluteWashoutAdenoma:
      "Eine Nebennierenläsion, die ein absolutes Washout > 60% hat, entspricht am ehesten einem Nebennierenadenom.\n",
    suggestionLowAbsoluteWashoutAdenoma:
      "Eine Nebennierenläsion, die ein absolutes Washout < 60% hat, entspricht am ehesten keinem Nebennierenadenom.\n",
    suggestionHighRelativeWashoutAdenoma:
      "Eine Nebennierenläsion, die ein relatives Washout > 40% hat, entspricht am ehesten einem Nebennierenadenom.\n",
    suggetionLowRelativeWashoutAdenoma:
      "Eine Nebennierenläsion, die ein relatives Washout < 40% hat, entspricht am ehesten keinem Nebennierenadenom.\n",
  },
} as const
