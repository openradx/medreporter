/**
 * This hook works together with the CSS in global.css
 */
const GRABBING_CLASS = "grabbing"

const on = () => {
  document.body.classList.add(GRABBING_CLASS)
}

const off = () => {
  document.body.classList.remove(GRABBING_CLASS)
}

export const useGrabbingCursor = () => [on, off]
