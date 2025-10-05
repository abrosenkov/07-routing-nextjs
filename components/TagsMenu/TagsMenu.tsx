"use client";

import { useState } from "react";
import css from "./TagsMenu.module.css";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((note) => (
            <li key={note} className={css.menuItem}>
              <a href={`/notes/filter/${note}`} className={css.menuLink}>
                {note}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
