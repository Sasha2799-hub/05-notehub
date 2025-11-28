import { useState,useEffect } from "react";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import Modal from "../Modal/Modal";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import type { NotesResponse } from "../../types/note";
import { useDebounce } from "use-debounce";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [debounceValue] = useDebounce(value, 500)

  const { data } = useQuery<NotesResponse>({
    queryKey: ["notes", debounceValue, currentPage],
    queryFn: () => fetchNotes(debounceValue, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
  setValue(value);
  setCurrentPage(1);
}


  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleCreateNote = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={value}
          onChange={handleSearchChange}
        />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages ?? 1}
            onChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => handleCreateNote()}>
          Create note +
        </button>
        {modalIsOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </header>
      <NoteList notes={notes} />
    </div>
  );
}
