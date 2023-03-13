import React from 'react'
import {v4 as uuidv4} from 'uuid';

export default function NoteItem({note}) {
  return (
        <li key={uuidv4()}>{note.title}</li>
  );
}
