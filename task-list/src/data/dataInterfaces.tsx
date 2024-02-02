export default interface Task {
  id: string,
  title: string,
  desc: string,
  completed: boolean,
  dueDate: string,
  priority: number,
  labels: Array<Label>,
  reminder: string
}

export interface Label {
  id: string,
  name: string,
  colour: string
}