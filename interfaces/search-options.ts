export interface BasicSearchOption {
  value: string
  label: string
}

export interface BasicSearchOptionGroup<OptionType = BasicSearchOption> {
  label: string
  options: Array<OptionType>
}

export interface HyperlinkedSearchOption extends BasicSearchOption {
  link?: string
}

export type HyperlinkedSearchOptionGroup = BasicSearchOptionGroup<HyperlinkedSearchOption>
