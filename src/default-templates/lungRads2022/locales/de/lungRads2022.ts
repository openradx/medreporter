export default {
  LungRads2022: {
    /**
     * Structure
     */
    toolTitle: "Lung-RADS 2022",
    toolHint:
      "Klassifizierung zur Unterstützung bei Befunden in der Niedrigdosis-CT-Screeninguntersuchung auf Lungenkrebs und zur Standardisierung des Follow-up. Nicht geeignet zur Klassifizierung inzidenteller Rundherde, siehe hierzu Fleischner 2017.",

    inputLabelExam: "Trifft eine der folgenden Aussagen auf die Untersuchung zu?",
    optionExamPriorCT:
      "Es existieren Voruntersuchungen des Patienten, welche aktuell nicht verfügbar sind.",
    optionExamNotEvaluable: "Ein Teil der oder die gesamte Lunge sind nicht evaluierbar.",
    optionExamInfectious: "Es bestehen Zeichen einer entzündlichen oder infektiösen Erkrankung.",
    optionExamNone: "Keine der Aussagen trifft zu.",

    inputLabelTimepoint: "Zeitpunkt",
    optionTimepointBaseline: "Baseline",
    optionTimepointFollowUp: "Follow-up",

    inputLabelPrevious: "Vorherige Klassifikation",
    optionPrevious0: "Lung-RADS 0",
    optionPrevious1: "Lung-RADS 1",
    optionPrevious2: "Lung-RADS 2",
    optionPrevious3: "Lung-RADS 3",
    optionPrevious4A: "Lung-RADS 4A",
    optionPrevious4B: "Lung-RADS 4B",
    optionPrevious4X: "Lung-RADS 4X",

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

    inputLabelFeaturesSolid: "Zeigt der Rundherd eine der folgenden Eigenschaften?",
    optionFeaturesSolidSmoothMargins:
      "Pleuranah mit glatter Begrenzung (& oval, linsenförmig oder dreieckig geformt)",
    optionFeaturesSolidSubsegmentalAirway: "Assoziiert zu subsegmentalem Bronchus",
    optionFeaturesSolidSegmentalAirway: "Assoziiert zu segmentalem oder proximalerem Bronchus",
    optionFeaturesSolidNone: "Keine der genannten Eigenschaften.",

    groupLabelDiameter: "Durchmesser (mm)",
    inputLabelLongaxis: "Längsachsendurchmesser (LAD)",
    inputLabelShortaxis: "Kurzachsendurchmesser (KAD)",

    groupLabelDiameterSolid: "Durchmesser (mm) der soliden Komponente",
    inputLabelSolidLongaxis: "LAD der soliden Komponente",
    inputLabelSolidShortaxis: "KAD der soliden Komponente",

    hintSolidMean:
      "Der mittlere Durchmesser der soliden Komponente kann nicht größer sein als der Gesamtdurchmesser des Nodulus.",

    inputLabelDynamic: "Dynamik",
    optionDynamicNew: "Neu aufgetretener Nodulus",
    optionDynamicStable: "Stabil oder abnehmend",
    optionDynamicSlowlyGrowing:
      "Langsame Größenzunahme über mehrere (>1) Scans (nicht >1.5mm innerhalb von 12 Monaten)",
    optionDynamicGrowing: "Größenzunahme (>1.5mm innerhalb von 12 Monaten)",

    inputLabelTimeOfDynamicNodule: "Zeit der Stabilität/Abnahme des Nodulus (Monate)",

    inputLabelFindingCyst: "Zyste",

    hintCyst:
      "Multiple Zysten können auf eine alternative Diagnose wie Langerhans-Zell-Histiozytose (LCH) oder Lymphangioleiomyomatose (LAM) hinweisen und werden nicht nach Lung-RADS klassifiziert, es sei denn, es bestehen anderweitige suspekte Merkmale.",

    inputLabelWall: "Zystenwand",
    optionWallThin: "Dünn (gleichmäßig, <2mm)",
    optionWallThick: "Dick (>2mm - symmetrisch, asymmetrisch oder nodulär)",

    inputLabelFormation: "Zystenformation",
    optionFormationUnilocular: "Unilokular",
    optionFormationMultilocular: "Multilokular",

    inputLabelDynamicUnilocular: "Dynamik",
    optionDynamicUnilocularStable: "Konstant oder abnehmend",
    optionDynamicUnilocularCystGrowing: "Größenzunahme der zystischen Komponente",
    optionDynamicUnilocularWallGrowing: "Zunahme der Wand/nodulären Komponente",

    inputLabelDynamicMultilocular: "Dynamik",
    optionDynamicMultilocularStable: "Konstant oder abnehmend",
    optionDynamicMultilocularCystGrowing: "Größenzunahme",
    optionDynamicMultilocularNewlyMultilocular: "Multilokulare Zyste war zuvor unilokular",
    optionDynamicMultilocularIncreasedSolid:
      "Zunehmende/neue Verdichtung oder zunehmende Lobulierung",

    inputLabelTimeOfDynamicCyst: "Zeit der Stabilität/Abnahme der Zyste (Monate)",

    inputLabelSuspicious: "Suspekte Befunde, die die Wahrscheinlichkeit für Lungenkrebs erhöhen",
    optionSuspiciousSpiculation: "Spikulierung",
    optionSuspiciousLymphadenopathy: "Lymphadenopathie",
    optionSuspiciousMetastasis: "Offensichtliche Metastasen",
    optionSuspiciousGgnDoubled: "Milchglasnodulus, welcher sich innerhalb 1 Jahres verdoppelt",
    optionSuspiciousOther: "Andere (siehe Freitext)",

    inputLabelSuspiciousOther: "Suspekte Befunde (andere)",

    inputLabelIncidentalFindings:
      "Zufallsbefunde (unabhängig von Lungenkrebs, fügt den S-Modifikator hinzu)",

    /**
     * Report
     */
    category: "Klassifikation",
    recommendation: "Handlungsempfehlung",
    reasonForX: "Grund für die Heraufstufung auf 4X",
    incidentalFindings: "Signifikante Nebenbefunde",

    noCategory: "Keine Klassifikation möglich",
    category0: "Lung-RADS 0",
    category1: "Lung-RADS 1",
    category2: "Lung-RADS 2",
    category3: "Lung-RADS 3",
    category4A: "Lung-RADS 4A",
    category4B: "Lung-RADS 4B",
    category4X: "Lung-RADS 4X",
    thinWalledUnilocular:
      "Dünnwandige, einfache Zysten werden als benigne eingestuft und nicht im Rahmen von LungRADS klassifiziert.",

    noRecommendationPossible: "Keine Handlungsempfehlung möglich.",
    comparison: "Vergleich zu vorherigen CT-Bildgebungen.",
    additional: "Erneute CT-Bildgebung im Rahmen des Lungenkarzinoms-Screenings.",
    ct1To3Months: "Low dose CT in 1 bis 3 Monaten.",
    ct12Months: "Low dose CT in 12 Monaten.",
    ct6Months: "Low dose CT in 6 Monaten.",
    ct3MonthsOrPet:
      "Low dose CT in 3 Monaten. Eine PET-CT sollte erwogen werden, wenn ein solider Nodulus oder eine solide Komponente von 8 mm oder mehr vorliegt.",
    clinicalEvaluation: "Weitere klinische Beurteilung notwendig.",
    tissueSamplingPetFollowUp:
      "Diagnostische CT mit oder ohne Kontrastmittel. Eine PET-CT sollte erwogen werden, wenn ein solider Nodulus oder eine solide Komponente von 8 mm oder mehr vorliegt. Alternativ kann eine bioptische Sicherung erfolgen. Das Management hängt von der klinischen Bewertung, dem Patientenwunsch und der Wahrscheinlichkeit für Malignität ab.",
    specificFinding:
      "Das Management sollte nach den ACR Richtlinien zum Umgang mit inzidentellen Befunden erfolgen (https://www.acr.org/Clinical-Resources/Incidental-Findings). Siehe hierzu auch den entsprechenden Quick Guide (https://www.acr.org/-/media/ACR/Files/Lung-Cancer-Screening-Resources/March-2022-LCS-Incidental-Findings-Quick-Guide_F).",

    additionSlowlyGrowing:
      "Langsam wachsende Noduli weisen möglicherweise keine erhöhte Stoffwechselaktivität in der PET-CT auf. Eine Biopsie, wenn verfügbar, oder eine chirurgische Evaluation kann daher das angemessenste Vorgehen sein.",

    suspiciousSpiculation: "Spikulierung",
    suspiciousLymphadenopathy: "Lymphadenopathie",
    suspiciousMetastasis: "offensichtliche Metastasen",
    suspiciousGgnDoubled: "Milchglasnodulus, welcher sich innerhalb 1 Jahres verdoppelt",
  },
}
