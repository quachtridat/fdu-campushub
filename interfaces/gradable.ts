export interface Gradable {
  id: number
  itemId: number
  dueDate: Date
  grade: number
  maxGrade: number
  comments?: string
}

export default Gradable
