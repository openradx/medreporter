export default {
  AdrenalWashout: {
    /**
     * Structure
     */
    toolTitle: "Adrenal gland CT (washout)",
    toolHint:
      "Characterization of unclear adrenal lesions to detect adenomas by using  computed tomography.\n",
    groupLabelDensity: "Density (HU)",
    inputLabelNonEnhanced: "Non-enhanced phase",
    inputLabelPortalVenous: "Portal venous phase",
    inputLabelDelayed: "Delayed phase",
    hintRoiPlacement:
      "The ROI should cover approximately two-third of the lesion without including the periphery.\n",
    hintPreferAbsoluteWashout: "Whenever possible the absolute washout should be preferred.\n",

    /**
     * Report
     */
    textAbsoluteWashoutRequirements:
      "Absolute washout requires non enhanced, portal venous and delayed phase.\n",
    textRelativeWashoutRequirements: "Relative washout requires portal and delayed phase.\n",
    resultRelativeWashoutInvalid: "Relative Washout: Invalide density values",
    resultAbsoluteWashoutInvalid: "Absolute Washout: Invalide density values",
    resultRelativeWashoutWithValue: "Relative washout: {{value}} %",
    resultAbsoluteWashoutWithValue: "Absolute washout: {{value}} %",
    missingValues: "Missing specification of density values.",
    noSuggestionPossible:
      "With the values entered, no assessment of the indeterminate adrenal lesion is possible. Complementary imaging such as FDG-PET/CT or MRI with in-phase (IP) and out-of-phase (OOP) sequences should be considered.\n",
    suggestionDensityLowerZeroAdenoma:
      "An adrenal lesion with a density < 0 HU on nonenhanced CT is highly specific for lipid-rich adenoma (47% sensitive, 100% specific)\n",
    suggestionDensityLowerTenAdenoma:
      'An adrenal lesion with a density < 10 HU on nonenhanced CT is fairly specific for lipid-rich adenoma (71% sensitive, 98% specific)"\n',
    suggestionHighDensityMalignancy:
      'An adrenal lesion with a density > 43 HU on nonenhanced CT that is neither calcified not hemorrhagic is suspicious for malignancy regardless of washout characteristics. Further diagnostic like FDG-PET/CT should be considered instead of washout imaging."\n',
    suggestionHighEnhancementPheochromocytoma:
      "An adrenal lesion that enhances > 130 HU is concerning for hypervascular pheochromocytoma.\n",
    suggestionHighAbsoluteWashoutAdenoma:
      "An adrenal lesion with > 60% washout is highly suggestive of adrenal adenoma.\n",
    suggestionLowAbsoluteWashoutAdenoma:
      "An adrenal lesion with < 60% washout is not confirming an adrenal adenoma. An alternative diagnoses should be considered.\n",
    suggestionHighRelativeWashoutAdenoma:
      "An adrenal lesion with > 40% washout is highly suggestive of adrenal adenoma.\n",
    suggetionLowRelativeWashoutAdenoma:
      "An adrenal lesion with < 40% washout is not confirming adrenal adenoma. An alternative diagnoses should be considered.\n",
  },
} as const
