import axios from "axios";
import type { Note } from "../types/note";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async (search = "", page = 1, perPage = 12) => {
  const res = await axios.get(`https://notehub-public.goit.study/api/notes`, {
    params: {
      page,
      perPage,
      search,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  console.log(res.data);

  return res.data;
};

export const createNote = async (newNote: Note): Promise<Note> => {
  const res = await axios.post(
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

export const deleteNote = async (id: string) => {
  const res = await axios.delete(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
  return res.data;
};
