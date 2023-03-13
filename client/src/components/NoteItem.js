import React from 'react'
import {v4 as uuidv4} from 'uuid';

export default function NoteItem({note, deleteNote}) {
  const handleDeleteNote = () => {
    deleteNote(note.id);
  }
  return (
        <li key={uuidv4()}>
          {note.title}
          <button onClick={handleDeleteNote}>Delete</button>
        </li>
  );
}
