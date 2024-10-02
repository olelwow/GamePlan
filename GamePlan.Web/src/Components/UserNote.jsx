import { useState, useEffect } from "react";

const UserNotes = (props) => {
  const [notes, setNotes] = useState([]);
  const [userNoteInputValue, setNoteInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 

  const fetchNotes = async () => {
    try {
        const response = await fetch(`https://localhost:7136/api/users/1/notes`);
        if (!response.ok) {
            throw new Error("Failed to fetch notes");
        }
        const data = await response.json();
        setNotes(data || []);
    } catch (error) {
        console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    if (props.user) {
      fetchNotes();
    } else {
      console.error("userId is undefined");
    }
  }, [props.user]);

  const addNote = async () => {
    if (!userNoteInputValue.trim()) {
        setErrorMessage("Anteckningen kan inte vara tom.");
        return;
      }

      if (userNoteInputValue.length > 30) {
        setErrorMessage("Anteckningen får inte vara längre än 30 tecken.");
        return;
      }
      setErrorMessage("");

    try {
        const response = await fetch(`https://localhost:7136/api/users/${props.user}/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({noteText: userNoteInputValue}),
        });

        if (!response.ok) {
            throw new Error("Failed to add note");
        }

        const savedNote = await response.json();
        setNotes([...notes, savedNote ]);
        setNoteInputValue("");
    } catch (error) {
        console.error("Error adding note:", error);
      }
  };

  const deleteNote = async (noteId) => {
    try {
        const response = await fetch(`https://localhost:7136/api/users/${props.user}/notes/${noteId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: props.user,
            noteId: noteId,
        }),
      });
  
        if (!response.ok) {
          throw new Error("Failed to delete note");
        }
  
        setNotes(notes.filter((note) => note.id !== noteId));
      } catch (error) {
        console.error("Error deleting note:", error);
      }
     
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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
      <div>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <span>{note.noteText}
              <button onClick={() =>deleteNote(note.id)}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserNotes;