import {
  HyperlinkedSearchOption,
  HyperlinkedSearchOptionGroup,
} from '@/interfaces/search-options'
import tiles from '@/globals/tooltiles/coursepages.tooltiles'

export const options: (courseId: number) => Array<HyperlinkedSearchOption> = (
  courseId
) =>
  tiles(courseId).map((tile) => ({
    value: tile.key,
    label: tile.name,
    link: tile.link,
  }))

export const optionGroups: (
  courseId: number
) => Array<HyperlinkedSearchOptionGroup> = (courseId) => [
  {
    label: 'Course',
    options: options(courseId),
  },
]

export default options
