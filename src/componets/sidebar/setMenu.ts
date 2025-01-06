import { createMenuEl } from "./createMenuEl";
import {
  menuActiveEventHandler,
  menuHoverEventHandler,
} from "./menuEventHandler";

export const setMenu = async () => {
  createMenuEl();
  menuHoverEventHandler();
  menuActiveEventHandler();
};
