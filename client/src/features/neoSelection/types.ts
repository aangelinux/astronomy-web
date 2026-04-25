export type NeoIdentifiers = {
  spkid: string
  name: string
}

export type NeoSelectionProps = {
  setInput: React.Dispatch<React.SetStateAction<string>>
  options: NeoIdentifiers[]
  setNeo: React.Dispatch<React.SetStateAction<NeoIdentifiers | null>>
  handleClick: () => void
  alert: boolean
}