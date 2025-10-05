import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "@/lib/api";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const onDelete = useMutation({
    mutationKey: ["notes"],
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((item) => (
        <li className={css.listItem} key={item.id}>
          <h2 className={css.title}>{item.title}</h2>
          <p className={css.content}>{item.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{item.tag}</span>
            <Link href={`/notes/${item.id}`} className={css.link}>
              View details
            </Link>
            <button
              onClick={() => onDelete.mutate(item.id)}
              className={css.button}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
