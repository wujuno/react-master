import {atom, selector} from "recoil"

export interface IToDo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}


export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default:[],
})

export const categoryState = atom({
    key:"categoryState",
    default: "TO_DO"
})

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
      const toDos = get(toDoState);
      const category = get(categoryState);
      return toDos.filter(todo => todo.category === category);
    },
  });
