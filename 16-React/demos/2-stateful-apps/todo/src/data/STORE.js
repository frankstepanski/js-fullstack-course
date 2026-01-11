import { v4 as uuid4 } from "uuid";

export const listoftodos = [
  {
    id: uuid4(),
    text: "goto gym",
    isCompleted: false
  },
  {
    id: uuid4(),
    text: "do laundry",
    isCompleted: true
  },
  {
    id: uuid4(),
    text: "food shopping",
    isCompleted: false
  },
  {
    id: uuid4(),
    text: "do homework",
    isCompleted: true
  }
];