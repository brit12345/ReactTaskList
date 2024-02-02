export default interface Task {
  id: number,
  title: string,
  desc: string,
  completed: boolean,
  dueDate: string,
  priority: number,
  labels: Array<Label>,
  reminder: string
}

export interface Label {
  id: number,
  name: string,
  colour: string
}