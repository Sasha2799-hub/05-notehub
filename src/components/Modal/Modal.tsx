import type { ModalIsClosed } from "../../types/note";
import NoteForm from "../NoteForm/NoteForm";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";

export default function Modal({ onClose }: ModalIsClosed) {
  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <NoteForm onClose={onClose} />
      </div>
    </div>,
    document.body
  );
}
