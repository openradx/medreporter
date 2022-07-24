interface GFR {
  creatinine: number
  age: number
  weight: number
  gender: "male" | "female"
  ethnicity: "africanAmerican" | "others"
}

type Output = number | null

export function calcCKDEPI(input: GFR): Output {
  // CKD-EPI
  let k: number
  let alpha: number
  let x: number
  let y: number

  if (input.gender === "male") {
    k = 0.9
    alpha = -0.329
    x = 1.018
  } else {
    k = 0.7
    alpha = -0.411
    x = 1
  }

  if (input.ethnicity === "africanAmerican") {
    y = 1.159
  } else {
    y = 1
  }

  const CKDEPI =
    141 *
    Math.min(input.creatinine / k, 1) ** alpha *
    Math.max(input.creatinine / k, 1) ** -1.209 *
    0.993 ** input.age *
    x *
    y

  return CKDEPI
}

export function calcCockcroft(input: GFR): Output {
  let a: number = 1
  if (input.gender === "female") {
    a = 0.85
  }

  const Cockcroft = ((140 - input.age) / input.creatinine) * (input.weight / 72) * a

  return Cockcroft
}

export function calcMayo(input: GFR): Output {
  let GF: number = 0
  let crea: number = input.creatinine

  if (input.gender === "female") {
    GF = 0.205
  }

  if (input.creatinine < 0.8) {
    crea = 0.8
  }

  const Mayo = Math.exp(1.911 + 5.249 / crea - 2.114 / crea ** 2 - 0.00686 * input.age - GF)
  return Mayo
}
