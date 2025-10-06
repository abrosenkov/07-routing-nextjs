"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreviewClient.module.css";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Modal from "@/components/Modal/Modal";

export default function NotePreview() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) return <Loader />;

  if (isError || !data) return <ErrorMessage />;

  const onClose = () => {
    router.back();
  };

  return (
    <Modal onCloseModal={onClose}>
      <div className={css.container}>
        {data && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{data.title}</h2>
            </div>
            <p className={css.content}>{data.content}</p>
            <p className={css.tag}>{data.tag}</p>
            <p className={css.date}>{formatDate(data.createdAt)}</p>
          </div>
        )}
      </div>
      <button onClick={onClose} type="button" className={css.cancelButton}>
        Back
      </button>
    </Modal>
  );
}
