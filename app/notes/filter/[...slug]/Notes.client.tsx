"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./page.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loader from "@/components/Loader/Loader";
import { NoteTag } from "@/types/note";

interface NotesClientProps {
  tag?: NoteTag | "";
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const changeQuery = useDebouncedCallback((query: string) => {
    setQuery(query);
    setPage(1);
  }, 1000);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", query, page, tag],
    queryFn: () => fetchNotes(query, page, tag),
    placeholderData: keepPreviousData,
  });

  const onOpenModal = () => {
    setModalIsOpen(true);
  };

  const onCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox setQuery={changeQuery} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            setPage={setPage}
          />
        )}
        <button onClick={onOpenModal} className={css.button}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError ? (
        <ErrorMessage />
      ) : (
        data && <NoteList notes={data.notes.length > 0 ? data.notes : []} />
      )}
      {modalIsOpen && (
        <Modal onCloseModal={onCloseModal}>
          <NoteForm onCloseModal={onCloseModal} />
        </Modal>
      )}
    </div>
  );
}
