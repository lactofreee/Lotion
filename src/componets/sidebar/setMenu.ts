import { getMenuList } from "../../api/sidebar/sidebarApi";
import { createMenuEl } from "./createMenuEl";
import { menuEventHandler } from "./menuEventHandler";

export const setMenu = async () => {
  const sidebarUlEl = document.getElementById("sidebar__doucument-list--ul");
  const menuList = await getMenuList();
  createMenuEl(sidebarUlEl, menuList);
  menuEventHandler();
};
