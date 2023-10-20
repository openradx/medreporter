export default {
  LungRads2022: {
    /**
     * Structure
     */
    toolTitle: "Lung-RADS 2022",
    toolHint:
      "Klassifizierung zur Unterstützung bei Befunden in der Niedrigdosis-CT-Screeninguntersuchung auf Lungenkrebs und zur Standardisierung des Follow-up. Nicht geeignet zur Klassifizierung inzidenteller Rundherde, siehe hierzu Fleischner 2017.",

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
      "Zeigt der Rundherd eine der folgendenen Eigenschaften? (für solide Rundherde)",
    optionFeaturesSolidSmoothMargins:
      "Pleuranah mit glatter Begrenzung (& oval, linsenförmig oder dreieckig geformt)",
    optionFeaturesSolidSubsegmentalAirway: "Assoziiert zu subsegmentalem Brnchus",
    optionFeaturesSolidSegmentalAirway: "Assoziiert zu segmentalem oder proximalerem Bronchus",
    optionFeaturesSolidNone: "Keine der genannten Eigenschaften.",

    groupLabelDiameter: "Durchmesser (mm)",
    inputLabelLongaxis: "Längsachsendurchmesser (LAD)",
    inputLabelShortaxis: "Kurzachsendurchmesser (KAD)",

    groupLabelDiameterSolid: "Durchmesser (mm) der soliden Komponente (für teils solide Noduli)",
    inputLabelSolidLongaxis: "LAD der soliden Komponente",
    inputLabelSolidShortaxis: "KAD der soliden Komponente",

    inputLabelGrowing: "Dynamik",
    optionGrowingNew: "Neu aufgetretener Nodulus",
    optionGrowingStable: "Stabil",
    optionGrowingSlowlyGrowing:
      "Langsame Größenzunahme über mehrere (>1) Scans (nicht >1.5mm innerhalb von 12 Monaten)",
    optionGrowingGrowing: "Größenzunahme (>1.5mm innerhalb von 12 Monaten)",
    optionGrowingDecreasing: "Größenabnahme",

    inputLabelFindingCyst: "Zyste",

    inputLabelWall: "Zystenwand",
    optionWallThin: "Dünn (gleichmäßig, <2mm)",
    optionWallThick: "Dick, (>2mm - symmetrisch, assymmetrisch oder nodulär)",

    inputLabelFormation: "Zystenformation",
    optionFormationUnilocular: "Unilokular",
    optionFormationMultilocular: "Multilokular",

    inputLabelGrowingUnilocular: "Dynamik (unilokular, dicke Wand)",
    optionGrowingUnilocularStable: "Konstant",
    optionGrowingUnilocularCystGrowing: "Größenzunahme der zystischen Komponente",
    optionGrowingUnilocularWallGrowing: "Zunahme der Wand/nodulären Komponente",

    inputLabelGrowingMultilocular: "Dynamik (multilokular)",
    optionGrowingMultilocularStable: "Konstant",
    optionGrowingMultilocularCystGrowing: "Größenzunahme",
    optionGrowingMultilocularNewlyMultilocular: "Multilokulare Zyste war zuvor unilokular",
    optionGrowingMultilocularIncreasedSolid:
      "Zunehmende/neue Verdichtung oder zunehmende Lobulierung",

    inputLabelSuspicious: "Andere Befunde, die die Wahrscheinlichkeit für Lungenkrebs erhöhen",
    optionSuspiciousSpiculation: "Spikulierung",
    optionSuspiciousLymphadenopathy: "Lymphadenopathie",
    optionSuspiciousMetastasis: "Offensichtliche Metastsen",
    optionSuspiciousOther: "Andere (siehe Freitext)",

    inputLabelSuspiciousOther: "Suspekte Befunde (andere)",

    inputLabelIncidentalFindings:
      "Zufallsbefunde (unabhängig von Lungenkrebs, fügt den S-Modifikator hinzu)",
  },
}
