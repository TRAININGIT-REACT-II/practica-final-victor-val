import React from 'react'
import {v4 as uuidv4} from 'uuid';

export default function NoteItem({note, showDetail, deleteNote}) {
  const handleDeleteNote = () => {
    deleteNote(note.id);
  }

  const handleDetail = () => {
    showDetail(note.id);
  }
  return (
        <li key={uuidv4()}>
          
          {note.title}
          <span>
            <button onClick={handleDetail}>Ver detalle</button>
            <button>Editar</button>
            <button onClick={handleDeleteNote}>Delete</button>
          </span>
        </li>
  );
}
