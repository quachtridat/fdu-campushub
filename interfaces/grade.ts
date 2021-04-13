import Course from './course'
import Item from './item'
import Gradable from './gradable'

export interface Grade {
  course: Course
  item: Item
  gradable: Gradable
}

export default Grade
