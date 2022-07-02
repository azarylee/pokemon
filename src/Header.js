import { useState } from "react";
import { useSharedNotes } from "./notesState";

export default function Header() {
  const [value, setValue] = useState("");
  const { addNote, clear } = useSharedNotes();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSendNoteClick = () => {
    addNote(value);
    setValue("");
  };

  const handleClearnNotesClick = () => {
    clear();
  };

  return (
    <div className="header">
      <input value={value} onChange={handleChange} placeholder="your note..." />
      <div className="buttons">
        <button onClick={handleSendNoteClick}>Send Note</button>
        <button onClick={handleClearnNotesClick}>Clear Notes</button>
      </div>
    </div>
  );
}
