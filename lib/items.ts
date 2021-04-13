import Item from '@/interfaces/item'

import itemList from '@/data/items/sample'

export function getCourseItems(
  courseId: number,
  isGradable?: boolean
): Array<Item> {
  return itemList.filter(
    (item) =>
      item.courseId == courseId &&
      (isGradable ? item.isGradable == isGradable : true)
  )
}
