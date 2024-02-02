import Task from "./dataInterfaces";

export const testData: Array<Task> = [
  {
    id: "1",
    title: "Return library books",
    desc: "3 library books need to be returned soon. I've finished the books already, just need to drop them off",
    completed: false,
    dueDate: "2025-02-02T19:35",
    priority: 2, //1 -5, 5 is extreme
    labels: [
      {
        id: "1",
        name: "casual",
        colour: "red"
      },
      {
        id: "2",
        name: "possible",
        colour: "yellow"
      }
    ],
    reminder: "2025-02-02T19:35"
  },
  {
    id: "2",
    title: "Reply to Janine",
    desc: "Janine sent an email about the updated budget, and I need to reply ASAP",
    completed: false,
    dueDate: "2025-02-02T20:35",
    priority: 5, //1 -5, 5 is extreme
    labels: [
      {
        id: "1",
        name: "work",
        colour: "purple"
      },
      {
        id: "2",
        name: "waiting",
        colour: "pink"
      }
    ],
    reminder: "2025-02-02T19:35"
  },
  {
    id: "3",
    title: "Do food shopping for this week",
    desc: "Need food for Tuesday to Saturday. Don't need anything for Sunday, going out to dinner with Andy",
    completed: true,
    dueDate: "2025-02-02T20:35",
    priority: 4, //1 -5, 5 is extreme
    labels: [
      {
        id: "1",
        name: "casual",
        colour: "red"
      },
      {
        id: "2",
        name: "possible",
        colour: "yellow"
      },
      {
        id: "3",
        name: "cost",
        colour: "green"
      }
    ],
    reminder: "2025-02-02T19:35"
  },
]