export default {
  KidneyVolume: {
    /**
     * Structure
     */
    toolTitle: "Nierenvolumen (Mayo-Modell)",
    toolHint:
      "Berechnung des Nierenvolumens bei ADPKD (mit/ohne Korrektur gegenüber der Körpergröße).\n",
    right: "Rechte Niere",
    left: "Linke Niere",
    coronal: "Länge coronar (cm)",
    sagittal: "Länge sagittal (cm)",
    width: "Breite (cm)",
    depth: "Tiefe (cm)",
    patient: "Patient",
    patientHeight: "Größe (m)",
    patientAge: "Alter (Jahre)",

    /**
     * Report
     */
    required: "Fehlende Eingaben.",
    result: "Ergebnis",
    resultRight: "Volumen rechte Niere: ",
    resultLeft: "Volumen linke Niere: ",
    resultTotal: "Gesamtnierenvolumen: ",
    resultTotalHeightCorrected: "Gesamtnierenvolumen mit Korrektur gegenüber der Körpergröße: ",
    wrongAge:
      "Der Patient/die Patientin muss zwischen 15 und 80 Jahre alt sein, ansonsten kann die Berechnung  nicht angewendet werden.\n",
    value: "{{value}} ml",
  },
} as const
