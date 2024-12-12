export default {
  Fleischner2017: {
    /**
     * Structure
     */
    toolTitle: "Fleischner 2017",
    toolHint:
      "Empfehlungen zum Follow-Up und Management für unklare pulmonale Noduli als Zufallsbefunde, veröffentlicht durch die Fleischner Society.\n",
    groupDiameter: "Durchmesser (mm)",
    inputLabelLongaxis: "Längsdurchmesser",
    inputLabelShortaxis: "Kurzachsendurchmesser",
    inputLabelStructure: "Struktur",
    optionStructureSolid: "Solide",
    optionStructurePartsolid: "Teils solide",
    optionStructureGroundglass: "Milchglas",
    inputLabelCount: "Anzahl",
    optionCountSingle: "Singulär",
    optionCountMultiple: "Multiple",
    inputLabelRiskFactors: "Risikofaktoren",
    optionsRiskFactorsYes: "Ja",
    optionsRiskFactorsNo: "Nein",
    hintApplicability:
      "Die Guideline ist nicht anwendbar auf Lungenkrebsscreening (siehe LungRads), Patienten unter 35 Jahren oder Patienten mit einer  vorliegenden Tumoranamnese oder Immunsuppression.\n",

    /**
     * Report
     */
    noSuggestionPossible: "Keine Empfehlung möglich.",
    suggestionOptionalAt12MonthsSuspicious:
      "Optionales CT nach 12 Monaten, insbesondere bei suspekter Morphologie und/oder Lokalisation im Oberlappen.",
    suggestionNoFollowUp: "Kein Follow-Up notwendig.",
    suggestionCt6To12MonthsAnd18To24: "CT nach 6-12 Monaten, anschließend CT nach 18-24 Monaten.",
    suggestionCt6to12MonthsAndConsider18To24:
      "CT nach 6-12 Monaten, anschließend gegebenenfalls CT nach 18-24 Monaten.",
    suggestionCt3MonthsPETSampling:
      "CT nach 3 Monaten oder weitere Abklärung mittels PET-CT oder Biopsie.",
    suggestionOptionalAt12Months: "Optionales CT nach 12 Monaten.",
    suggestionCt3To6MonthsAnd18To24: "CT nach 3-6 Monaten, anschließend CT nach 18-24 Monaten.",
    suggestionCt3To6MonthsAndConsider18To24:
      "CT nach 3-6 Monaten, anschließend gegebenenfalls CT nach 18-24 Monaten.",
    suggestionCt6To12Months2Years5Years:
      "CT nach 6-12 Monaten, anschließend falls persistierend CT alle  2 Jahre bis 5 Jahre nach Erstbildgebung.",
    suggestionCt3To6MonthsAnnual:
      "CT nach 3-6 Monaten, anschließend falls persistierend und solide Komponente weiter unter 6 mm jährliches CT bis 5 Jahre.",
    suggestionCt3To6Months2And4Years:
      "CT nach 3-6 Monaten, anschließend falls stabil gegebenenfalls CT nach 2 und 4 Jahren bei Risikopatienten.",
    suggestionCt3To6MonthsMostSuspicious:
      "CT nach 3-6 Monaten, anschließend weiteres Management basierend auf dem suspektesten Nodulus.",
    textRecommendation: "Empfehlung",
  },
} as const
