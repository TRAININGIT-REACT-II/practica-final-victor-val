import React from 'react'
import NoteItem from './NoteItem';

export function NoteList({notes, showDetail, deleteNote}) {
    return (
        <ul>
            {notes && notes.map(note => (
                <NoteItem note={note} showDetail={showDetail} deleteNote={deleteNote}/>
            ))}
        </ul>
    );
}
