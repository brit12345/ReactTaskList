import React, { createContext, Dispatch, SetStateAction} from "react";
import Task from "../data/dataInterfaces";
import { pages } from "../data/pages";

interface AppContextInterface {
  tasks: Array<Task>;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  detailID: string | null;
  setDetailID: React.Dispatch<React.SetStateAction<string | null>>;
}

export const MyContext = createContext<AppContextInterface>({
  tasks: [],
  setTasks: () => {},
  currentPage: pages.table,
  setCurrentPage: () => {},
  detailID: "",
  setDetailID: () => {}
});