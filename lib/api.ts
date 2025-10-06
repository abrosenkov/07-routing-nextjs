import axios from "axios"
import { Note, NoteTag } from "../types/note";

interface NotesApiResponse {
    notes: Note[];
    totalPages: number;
}

interface NewNote {
    title: string;
    content?: string;
    tag: NoteTag;
}

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const fetchNotes = async (search: string, page: number, tag?: string): Promise<NotesApiResponse> => {
    const response = await api.get<NotesApiResponse>("/notes", {
        params: {
            search,
            page,
            tag,
        }
    });
    return response.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
}

export const createNote = async (note: NewNote): Promise<Note> => {
    const response = await api.post<Note>("/notes", note);
    return response.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await api.delete<Note>(`/notes/${id}`);
    return response.data;
}
