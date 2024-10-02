import { useState } from "react";

const UserNotes = (props) => {
  const [note, setNote] = useState([]);
  const [userNoteInputValue, setNoteInputValue] = useState("");

  const addNote = () => {
    setNote([ ...note, {text: userNoteInputValue} ]);
    setNoteInputValue("");
  };

  const deleteNote = (index) => {
    const newNoteList = note.filter((_, noteIndex) => noteIndex !== index);
    setNote(newNoteList);
  };

  return (
    <div className="NoteBoard">
      <h1>Note-List</h1>
      <div>
        <input
          type="text"
          value={userNoteInputValue}
          onChange={(e) => setNoteInputValue(e.target.value)}
          placeholder="Add new note"
        />
        <button onClick={addNote}>Add</button>
      </div>
      <div>
        <ul>
          {note.map((note, index) => (
            <li key={index}>
              <span>{note.text}
              <button onClick={() =>deleteNote(index)}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserNotes;