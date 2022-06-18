export function calcAbsoluteAdrenalWashout(
  nonEnhanced: number,
  portalVenous: number,
  delayed: number
): number {
  return ((portalVenous - delayed) / (portalVenous - nonEnhanced)) * 100
}

export function calcRelativeAdrenalWashout(portalVenous: number, delayed: number): number {
  return ((portalVenous - delayed) / portalVenous) * 100
}

export function calcAdrenalAdenoma(input: Input): Output {
  const absoluteWashout =
    ((input.portalVenous - input.delayed) / (input.portalVenous - input.nonEnhanced)) * 100
  const relativeWashout = ((input.portalVenous - input.delayed) / input.portalVenous) * 100

  let conclusion = ""

  if (input.nonEnhanced < 0) {
    conclusion =
      "An adrenal lesion with a density <0 HU on nonenhanced CT is highly specific for lipid-rich adenoma (47% sensitive, 100% specific)" //1
  } else if (input.nonEnhanced < 10) {
    conclusion =
      "An adrenal lesion with a density <10 HU on nonenhanced CT is fairly specific for lipid-rich adenoma (71% sensitive, 98% specific)" //1
  } else if (input.nonEnhanced >= 43) {
    conclusion =
      "An adrenal lesion with a density >43 HU on nonenhanced CT that is neither calcified not hemorrhagic is suspicious for malignancy regardless of washout characteristics. Further diagnostic like FDG-PET/CT should be considered instead of washout imaging." // 2
  } else if (input.portalVenous >= 130) {
    conclusion =
      "An indeterminate adrenal lesion that enhances more than 130 HU is concerning for hypervascular pheochromocytoma." // 3
  } else {
    if (absoluteWashout >= 60) {
      conclusion = ">60% washout is highly suggestive of adrenal adenoma."
    } else {
      conclusion =
        "<60% washout is not confirming adrenal adenoma, alternative diagnoses should be considered."
    }
    if (relativeWashout >= 40) {
      conclusion + ">40% washout is highly suggestive of adrenal adenoma."
    } else {
      conclusion +
        "<40% washout is not confirming adrenal adenoma, alternative diagnoses should be considered."
    }
  }

  return conclusion
}
