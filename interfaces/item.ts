export interface Item {
  id: number
  courseId: number
  creationDate: Date
  title: string
  content: string
  isGradable?: boolean
}

export default Item
