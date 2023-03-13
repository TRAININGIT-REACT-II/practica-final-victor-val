import React from 'react'
import NoteItem from './NoteItem';

export function NoteList({notes, deleteNote}) {
    return (
        <ul>
            {notes && notes.map(note => (
                <NoteItem note={note} deleteNote={deleteNote}/>
            ))}
        </ul>
    );
}
