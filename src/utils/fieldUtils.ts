import { Option } from "~/schemas/structure"

export function createExampleOptions(num: number) {
  const options: Option[] = []
  for (let i = 0; i < num; i++) {
    options.push({
      label: `Option ${i + 1}`,
      value: `option-${i + 1}`,
    })
  }
  return options
}
