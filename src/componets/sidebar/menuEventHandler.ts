export const menuHoverEventHandler = () => {
  const parentEl = document.getElementById("sidebar__doucument-list--ul");

  parentEl?.addEventListener("mouseover", (event) => {
    const targetEl = event.target as HTMLElement;

    const liEl = targetEl.closest("#sidebar__doucument-list--li");

    if (liEl) {
      liEl.classList.add("doucument-list--hover");
    }
  });

  parentEl?.addEventListener("mouseout", (event) => {
    const targetEl = event.target as HTMLElement;

    const liEl = targetEl.closest("#sidebar__doucument-list--li");

    if (liEl) {
      liEl.classList.remove("doucument-list--hover");
    }
  });
};

export const menuActiveEventHandler = () => {
  const parentEl = document.getElementById("sidebar__doucument-list--ul");

  parentEl?.addEventListener("click", (event) => {
    const dropDownButton = event.target?.closest(
      "#doucument-list__dropdown--button"
    );

    if (dropDownButton) {
      const isActive = dropDownButton.classList.toggle("active");

      const liEl = dropDownButton.closest("li");

      if (liEl) {
        if (isActive) {
          liEl.classList.add("doucument-list--active");
        } else {
          liEl.classList.remove("doucument-list--active");
        }
      }
    }
  });
};
