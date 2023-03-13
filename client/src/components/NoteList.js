import React from 'react'
import NoteItem from './NoteItem';

export function NoteList({notes}) {
    return (
        <ul>
            {notes && notes.map(note => (
                <NoteItem note={note}/>
            ))}
        </ul>
    );
}
