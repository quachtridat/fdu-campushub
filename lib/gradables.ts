import Gradable from '@/interfaces/gradable'

import { getCourseItems } from './items'
import gradableList from '@/data/gradables/sample'

export function getCourseGradables(courseId: number): Array<Gradable> {
  const courseGradableItems = getCourseItems(courseId, true)
  return gradableList.filter((gradable) =>
    courseGradableItems.find((item) => item.id == gradable.itemId)
  )
}
