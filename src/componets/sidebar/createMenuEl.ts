import { getMenuList } from "../../api/sidebar/sidebarApi";
import { buildMenuTree } from "./buildMenuTree";

export const createMenuEl = async () => {
  const sidebarUlEl = document.getElementById("sidebar__doucument-list--ul");
  const menuList = await getMenuList();
  const menuTree = buildMenuTree(menuList);

  menuTree.forEach((docItem) => {
    // <li>
    const li = document.createElement("li");
    li.id = "sidebar__doucument-list--li";
    li.className = "sidebar__doucument-list--li";

    // 첫 번째 <button>
    const dropdownButton = document.createElement("button");
    dropdownButton.id = "doucument-list__dropdown--button";
    dropdownButton.className = "doucument-list__dropdown--button";

    const dropdownImg = document.createElement("img");
    dropdownImg.src = "./src/asset/hover-dropdown.svg";
    dropdownImg.alt = "hover 드롭다운 버튼";
    dropdownButton.appendChild(dropdownImg);

    // <a>
    const link = document.createElement("a");
    link.id = "sidebar__doucument-list--link";
    link.className = "sidebar__doucument-list--link";
    link.href = "#";
    link.textContent = docItem.title;

    // 두 번째 <button>
    const addButton = document.createElement("button");
    addButton.id = "doucument-list__create-document--button";
    addButton.className = "doucument-list__create-document--button";
    addButton.setAttribute("data-tooltip", "하위 문서 추가");
    addButton.setAttribute("data-tooltip-position", "bottom");

    const addImg = document.createElement("img");
    addImg.src = "./src/asset/plus.svg";
    addImg.alt = "하위 문서 추가 버튼";
    addButton.appendChild(addImg);

    li.appendChild(dropdownButton);
    li.appendChild(link);
    li.appendChild(addButton);
    sidebarUlEl?.appendChild(li);
  });
};
