import React from 'react'
import NoteItem from './NoteItem';

export function NoteList({notes, showDetail, handleEditNote, deleteNote}) {
    return (
        <ul>
            {notes && notes.map(note => (
                <NoteItem note={note} showDetail={showDetail} handleEditNote={handleEditNote} deleteNote={deleteNote}/>
            ))}
        </ul>
    );
}
