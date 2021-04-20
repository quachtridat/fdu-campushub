import {
  HyperlinkedSearchOption,
  HyperlinkedSearchOptionGroup,
} from '@/interfaces/search-options'
import tiles from '@/globals/tooltiles/mainpages.tooltiles'

const options: Array<HyperlinkedSearchOption> = tiles.map((tile) => ({
  value: tile.key,
  label: tile.name,
  link: tile.link,
}))

export const optionGroups: Array<HyperlinkedSearchOptionGroup> = [
  {
    label: 'Main',
    options: options,
  },
]

export default options
