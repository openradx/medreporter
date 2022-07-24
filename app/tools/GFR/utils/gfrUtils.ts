type Gender = "male" | "female"
type Ethnicity = "africanAmerican" | "others"

export function calcCKDEPI(
  creatinine: number,
  age: number,
  gender: Gender,
  ethnicity: Ethnicity
): number {
  let k: number
  let alpha: number
  let x: number
  let y: number

  if (gender === "male") {
    k = 0.9
    alpha = -0.329
    x = 1.018
  } else {
    k = 0.7
    alpha = -0.411
    x = 1
  }

  if (ethnicity === "africanAmerican") {
    y = 1.159
  } else {
    y = 1
  }

  const CKDEPI =
    141 *
    Math.min(creatinine / k, 1) ** alpha *
    Math.max(creatinine / k, 1) ** -1.209 *
    0.993 ** age *
    x *
    y

  return CKDEPI
}

export function calcCockcroft(
  creatinine: number,
  age: number,
  weight: number,
  gender: Gender
): number {
  let a: number = 1
  if (gender === "female") {
    a = 0.85
  }

  const Cockcroft = ((140 - age) / creatinine) * (weight / 72) * a

  return Cockcroft
}

export function calcMayo(creatinine: number, age: number, gender: Gender): number {
  let GF: number = 0
  let crea: number = creatinine

  if (gender === "female") {
    GF = 0.205
  }

  if (creatinine < 0.8) {
    crea = 0.8
  }

  const Mayo = Math.exp(1.911 + 5.249 / crea - 2.114 / crea ** 2 - 0.00686 * age - GF)
  return Mayo
}
