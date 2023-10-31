export default {
  LungRads2022: {
    /**
     * Structure
     */
    toolTitle: "Lung-RADS 2022",
    toolHint:
      "Classification proposed to aid with findings in low-dose CT screening exams for lung cancer and to standarize the Follow-Up. Not suitable for classifiation of incidental noduli, see Fleischner 2017.",

    inputLabelExam: "Do any of these apply to the exam?",
    optionExamPriorCT: "Prior CT exists but is not available",
    optionExamNotEvaluable: "Part or all of lung is not evaluable",
    optionExamInfectious: "Signs of an inflammatory or infectious disease.",
    optionExamNone: "None of the above apply.",

    inputLabelTimepoint: "Timepoint",
    optionTimepointBaseline: "Baseline",
    optionTimepointFollowUp: "Follow-up",

    inputLabelPrevious: "Previous Classification",
    optionPrevious0: "LungRADS 0",
    optionPrevious1: "LungRADS 1",
    optionPrevious2: "LungRADS 2",
    optionPrevious3: "LungRADS 3",
    optionPrevious4A: "LungRADS 4A",
    optionPrevious4B: "LungRADS 4B",
    optionPrevious4X: "LungRADS 4X",

    inputLabelFindingNodule: "Nodule",

    inputLabelBenignFeatures: "Does the nodule have any of the following?",
    optionBenignFeaturesCalcification: "Calcification (e.g. complete, central, popcorn, ring)",
    optionBenignFeaturesFat: "Fat",
    optionBenignFeaturesNone: "None of the above.",

    inputLabelStructure: "Structure",
    optionStructureSolid: "Solid",
    optionStructurePartsolid: "Partsolid",
    optionStructureGroundglass: "Groundglass",

    inputLabelFeaturesSolid: "Has the nodule any of the following features? (for solid nodule)",
    optionFeaturesSolidSmoothMargins:
      "Juxtapleural with smooth margins (& oval, lentiform, or triangular shaped)",
    optionFeaturesSolidSubsegmentalAirway: "Subsegmental airway",
    optionFeaturesSolidSegmentalAirway: " Segmental airway, or more proximal",
    optionFeaturesSolidNone: "None of the above.",

    groupLabelDiameter: "Diameter (mm)",
    inputLabelLongaxis: "Long axis diameter",
    inputLabelShortaxis: "Short axis diameter",

    groupLabelDiameterSolid: "Diameter (mm) of the solid component (for partsolid nodule)",
    inputLabelSolidLongaxis: "Long axis diameter of the solid component",
    inputLabelSolidShortaxis: "Short axis diameter of the solid component",

    hintSolidMean:
      "Mean diameter of the solid component cannot be larger than the total mean diameter.",

    inputLabelDynamic: "Is the nodule growing?",
    optionDynamicNew: "New nodule",
    optionDynamicStable: "Stable or decreasing",
    optionDynamicSlowlyGrowing:
      "Slowly growing over multiple (>1) scans (not growing >1.5mm within 12-month)",
    optionDynamicGrowing: "Growing (> 1.5 mm within 12-month)",

    inputLabelTimeOfDynamicNodule: "Time of dynamic of the nodule (months)",

    inputLabelFindingCyst: "Cyst",

    hintCyst:
      "Multiple cysts may indicate an alternative diagnosis such as Langerhans cell histiocytosis (LCH) or lymphangioleiomyomatosis (LAM) and are not classified in Lung-RADS unless other concerning features are identified.",

    inputLabelWall: "Wall of cyst",
    optionWallThin: "Thin (uniform thickness of <2mm",
    optionWallThick: "Thick (>2mm - symmetric, assymmetric or nodular)",

    inputLabelFormation: "Formation of cyst",
    optionFormationUnilocular: "Unilocular",
    optionFormationMultilocular: "Multilocular",

    inputLabelDynamicUnilocular: "Dynamic (unilocular, thick wall",
    optionDynamicUnilocularStable: "Stable or decreasing",
    optionDynamicUnilocularCystGrowing: "Cystic component is growing",
    optionDynamicUnilocularWallGrowing: "Wall thickness/nodularity is growing",

    inputLabelDynamicMultilocular: "Dynamic (multilocular)",
    optionDynamicMultilocularStable: "Stable or decreasing",
    optionDynamicMultilocularCystGrowing: "Cystic component is growing",
    optionDynamicMultilocularNewlyMultilocular: "Multilocular cyst was unilocular before",
    optionDynamicMultilocularIncreasedSolid: "Increased/new opacity or increased loculation",

    inputLabelTimeOfDynamicCyst: "Time of dynamic of the cyst (months)",

    inputLabelSuspicious: "Other findings suspicious of lung cancer",
    optionSuspiciousSpiculation: "Spiculation",
    optionSuspiciousLymphadenopathy: "Lymphadenopathy",
    optionSuspiciousMetastasis: "Frank metastatic disease",
    optionSuspiciousGgnDoubled: "Ground glas nodule, that doubled in size in 1 year",
    optionSuspiciousOther: "Other (add comment)",

    inputLabelSuspiciousOther: "Suspicious finding (other)",

    inputLabelIncidentalFindings:
      "Significant incidental finding (unrelated to lung cancer, adds S-Modifier)",

    /**
     * Report
     */

    category: "Category",
    recommendation: "Recommendation of action",
    reasonForX: "Reason for 4X classification",
    incidentalFindings: "Incidental findings",

    noCategory: "No categorization possible",
    category0: "Lung-RADS 0",
    category1: "Lung-RADS 1",
    category2: "Lung-RADS 2",
    category3: "Lung-RADS 3",
    category4A: "Lung-RADS 4A",
    category4B: "Lung-RADS 4B",
    category4X: "Lung-RADS 4X",
    thinWalledUnilocular:
      "Thin-walled unilocular cysts are considered benign and are not scored in LUNG-RADS.",

    noRecommendationPossible: "No recommendation possible.",
    comparison: "Comparison to prior chest CT.",
    additional: "Additional lung cancer screening CT imaging needed.",
    ct1To3Months: "Low dose CT in 1 to 3 months.",
    ct12Months: "Low dose CT in 12 months.",
    ct6Months: "Low dose CT in 6 months.",
    ct3MonthsOrPet:
      "Low dose CT in 3 months. PET/CT may be considered if there is a solid nodule or solid component of 8 mm or more.",
    clinicalEvaluation: "Referral for further clinical evaluation.",
    tissueSamplingPetFollowUp:
      "Diagnostic chest CT with or without contrast. PET/CT may be considered if there is a solid nodule or solid component of 8 mm or more. Tissue sampling. And/or referral for further clinical evaluation. Management depends on clinical evaluation, patient preference, and the probability of maligancy.",
    specificFinding:
      "Management should adhere to available ACR Incidental Findings management recommendations (https://www.acr.org/Clinical-Resources/Incidental-Findings). See the quick guide for management of incidental findings (https://www.acr.org/-/media/ACR/Files/Lung-Cancer-Screening-Resources/March-2022-LCS-Incidental-Findings-Quick-Guide_F).",

    suspiciousSpiculation: "Spiculation",
    suspiciousLymphadenopathy: "Lymphadenopathy",
    suspiciousMetastasis: "Frank metastatic disease",
    suspiciousGgnDoubled: "Ground glas nodule, that doubled in size in 1 year",
  },
}
