import { useState, useEffect } from "react";

const UserNotes = (props) => {
  const [note, setNote] = useState([]);
  const [userNoteInputValue, setNoteInputValue] = useState("");
  const userId = props.userId;

  const fetchNotes = async () => {
    try {
        const respons = await fetch(`/api/users/${userId}/notes`);
        if (!response.ok) {
            throw new Error("Failed to fetch notes");
        }
        const data = await respons.json();
        setNote(data.notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  },[userId]);

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
              <span>{note}
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