import {atom, selector} from "recoil"


export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
  }

export interface IToDo {
    text: string;
    id: number;
    category: Categories;
}

const localToDosJSON = localStorage.getItem("ToDos");
const localToDos = JSON.parse(localToDosJSON as any);

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default:localToDos,
})

export const categoryState = atom<Categories>({
    key:"categoryState",
    default: Categories.TO_DO
})


export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
      const toDos = get(toDoState);
      const category = get(categoryState);
      return toDos.filter(todo => todo.category === category);
    },
  });
