export type FigureMetadata = {
  lngs: string[]
  title: { [lng: string]: string }
  description: { [lng: string]: string }
  options: { [id: string]: { [lng: string]: string } }
}

export type FigureDocument = {
  svg: string
  meta: FigureMetadata
}
