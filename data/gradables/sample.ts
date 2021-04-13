import Gradable from '@/interfaces/gradable'

const gradableList: Array<Gradable> = [
  {
    id: 1,
    itemId: 1,
    dueDate: new Date(2021, 2, 17),
    grade: 7,
    maxGrade: 10,
    comments: `Thank you for your resubmission, group 1. It is definitely an improvement over your last version. Thank you for incoporating some of my suggestions. You approached the human factors from from the correct perspective this time, although you got the first one wrong (physical ergonomics) and some of the factors should have been explored in more detail (more than just "yes" or "no")`,
  },
  {
    id: 2,
    itemId: 2,
    dueDate: new Date(2021, 3, 21),
    grade: 25,
    maxGrade: 25,
  },
  {
    id: 3,
    itemId: 3,
    dueDate: new Date(2021, 3, 25),
    grade: 5,
    maxGrade: 5,
    comments: `Good`,
  },
]

export default gradableList
