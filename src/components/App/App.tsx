import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import Modal from "../Modal/Modal";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import type { NotesResponse } from "../../types/note";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { data } = useQuery<NotesResponse>({
    queryKey: ["notes", search, currentPage],
    queryFn: () => fetchNotes(search, currentPage),
    placeholderData: keepPreviousData,
  });

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
          searchValue={search}
          setSearchValue={setSearch}
          setCurrentPage={setCurrentPage}
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
