export default {
  LungRads2022: {
    /**
     * Structure
     */
    toolTitle: "Lung-RADS 2022",
    toolHint:
      "Klassifizierung zur Unterstützung bei Befunden in der Niedrigdosis-CT-Screeninguntersuchung auf Lungenkrebs und zur Standardisierung des Follow-up.",

    inputLabelScan: "Zeitpunkt",
    optionScanBaseline: "Baseline",
    optionScanFollowUp: "Follow-up",

    inputLabelExam: "Trifft eine dieser Aussagen auf der folgenden Untersuchung zu?",
    optionExamPriorCT:
      "Es existieren Voruntersuchungen des Patienten, welche aktuell nicht verfügbar sind.",
    optionExamNotEvaluable: "Ein Teil der oder die gesamte Lunge sind nicht evaluierbar.",
    optionExamInfectious: "Es bestehen Zeichen einer entzündlichen oder infektiösen Erkrankung.",
    optionExamNone: "Keine der Aussagen trifft zu.",

    inputLabelFindingNodule: "Rundherd",

    inputLabelBenignFeatures: "Besitzt der Rundherd eine der folgenden Eigenschaften?",
    optionBenignFeaturesCalcification:
      "Kalzifikationen (z.B. vollständig, zentral, popcornartig, ringförmig)",
    optionBenignFeaturesFat: "Fett",
    optionBenignFeaturesNone: "Keine der aufgeführten Eigenschaften.",

    inputLabelStructure: "Struktur",
    optionStructureSolid: "Solide",
    optionStructurePartsolid: "Teils solide",
    optionStructureGroundglass: "Milchglas",

    inputLabelFeaturesSolid:
      "Zeigt der Rundherd eine der folgendenen Eigenschaften? (Solide Rundherde)",
    optionFeaturesSolidSmoothMargins:
      "Juxtapleural with smooth margins (& oval, lentiform, or triangular shaped)",
    optionFeaturesSolidSubsegmentalAirway: "Subsegmental airway",
    optionFeaturesSolidSegmentalAirway: " Segmental airway, or more proximal",
    optionFeaturesSolidNone: "None of the above.",

    groupDiameter: "Durchmesser (mm)",
    inputLabelLongaxis: "Längsachsendurchmesser (LAD)",
    inputLabelShortaxis: "Kurzachsendurchmesser (KAD)",

    groupDiameterSolid: "Durchmesser (mm) der soliden Komponente",
    inputLabelSolidLongaxis: "LAD der soliden Komponente",
    inputLabelSolidShortaxis: "KAD der soliden Komponente",

    inputLabelGrowing: "Dynamik",
    optionGrowingNew: "Neu aufgetretener Nodulus",
    optionGrowingStable: "Stabil",
    optionGrowingSlowlyGrowing:
      "Langsame Größenzunahme über mehrere (>1) Scans (nicht >1.5mm innerhalb von 12 Monaten)",
    optionGrowingGrowing: "Größenzunahme (>1.5mm innerhalb von 12 Monaten)",
    optionGrowingDecreasing: "Größenabnahme",
  },
}
