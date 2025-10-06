"use client";

import { useEffect, useState } from "react";
import css from "./TagsMenu.module.css";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest(`.${css.menuContainer}`)) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen]);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <a
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={close}>
                {tag}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
