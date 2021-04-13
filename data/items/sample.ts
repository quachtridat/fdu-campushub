import Item from '@/interfaces/item'

const itemList: Array<Item> = [
  {
    id: 1,
    courseId: 3,
    creationDate: new Date(2021, 2, 17),
    title: 'Design Brief',
    content: `You are required to create a prototype of a user interface for a project that your team has agreed on.
This project is broken down into several components; the first component is the Design Brief to define the problem that you will be working on for your project. 700-800 words minimum.
    `,
    isGradable: true,
  },
  {
    id: 2,
    courseId: 3,
    creationDate: new Date(2021, 3, 21),
    title: 'Research Report',
    content: `Please write a user research report with your group.`,
    isGradable: true,
  },
  {
    id: 3,
    courseId: 3,
    creationDate: new Date(2021, 3, 25),
    title: 'Persona',
    content: `Please create 1 persona and 1 scenario`,
    isGradable: true,
  },
]

export default itemList
