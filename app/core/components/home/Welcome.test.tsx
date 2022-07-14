import { render, screen } from "@testing-library/react"
import { Welcome } from "./Welcome"

describe("Welcome component", () => {
  it("has MedReporter title", () => {
    render(<Welcome />)
    expect(screen.getByText(/MedReporter/)).toBeInTheDocument()
  })
})
