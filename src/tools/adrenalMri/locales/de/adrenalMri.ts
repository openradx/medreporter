export default {
  AdrenalMri: {
    /**
     * Structure
     */
    toolTitle: "Nebennieren MRT",
    toolHint:
      "Charakterisierung von unklaren Nebennierenläsionen zur Erkennung von Nebennierenadenomen in der MRT.\n",
    groupLabelAdrenal: "Nebennierenläsion",
    inputLabelAdrenalInPhase: "Signal In-Phase",
    inputLabelAdrenalOppPhase: "Signal Opposed-Phase",
    groupLabelSpleen: "Milz",
    inputLabelSpleenInPhase: "Signal In-Phase",
    inputLabelSpleenOppPhase: "Signal Opposed-Phase",
    hintLimitations:
      "Cave: Die Aussagekraft der MRT-Messungen ist geringer als die Washout-Messungen im CT für Läsionen  mit nativ ≥20 HE und deutlich eingeschränkt für Läsion mit nativ ≥30 HU.\n",
    hintTesla:
      "Cave: Der Grenzwert des Signalabfalls von 16,5% wurde bei 1,5 Tesla bestimmt. Bei 3 Tesla liegt  der Grenzwert möglicherweise niedriger.\n",
    references: "Quellen",

    /**
     * Report
     */
    textSignalDropoutRequirements:
      "Die Berechnung des Signalabfalls benötigt die Signalwerte der Nebennierenläsion in  In- und Opposed-Phase.\n",
    textSignalDropoutWithValue:
      "Signalabfall der Läsion zwischen In-Phase und Opposed-Phase: {{value}} %\n",
    textAdrenalToSpleenRatioRequirements:
      "Die Berechnung des Verhältnisses zwischen Läsion und Milz benötigt die Signalwerte der  Nebennierenläsion und der Milz in In- und Opposed-Phase.\n",
    textAdrenalToSpleenRatioWithValue: "Verhältnis Signalabfall Läsion zu Milz: {{value}}",
    missingValues: "Fehlende Signalwerte.",
    csiAdenoma:
      "Der Signalabfall ist größer als 16.5%, die Läsion ist als lipidreiches Adenom einzustufen.",
    csiUnclear:
      "Der Signalabfall ist kleiner oder gleich 16.5%, die Läsion ist als unklar einzustufen.",
    toSpleenAdenoma:
      "Das Verhältnis der Ratio der Läsion zur Milz ist kleiner als 0.71, die Läsion ist als lipidreiches  Adenom einzustufen.\n",
    toSpleenUnclear:
      "Das Verhältnis der Ratio der Läsion zur Milz ist größer oder gleich 0.71, die Läsion ist als  unklar einzustufen.\n",
  },
} as const
