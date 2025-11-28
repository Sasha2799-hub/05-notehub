import axios from "axios";
import type { Note, CreateNote } from "../types/note";
import type { NotesResponse } from "../types/note";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async (
  search = "",
  page = 1,
  perPage = 12
): Promise<NotesResponse> => {
  const res = await axios.get<NotesResponse>(`https://notehub-public.goit.study/api/notes`, {
    params: {
      page,
      perPage,
      search,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return res.data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const res = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    newNote,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  return res.data;
};

export const deleteNote = async (id: string): Promise<{ message: string } >=> {
  const res = await axios.delete<{message: string}>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
  return res.data;
};
