import React from 'react'
import NoteItem from './NoteItem';
import {useState, useEffect} from "react";

export function NoteList({notes, showDetail, handleEditNote, deleteNote, handleVistaNotas}) {
    const [notas, setNotas] = useState([]);

    useEffect(() => {
        setNotas(notes);
    }, [notes]);

    const handleOrder = () =>{
        let notes = [...notas];
        setNotas([]);
        notes.sort((a,b) => a.title.localeCompare(b.title));
        setNotas(notes);
    }
    const handleVista = () =>{
        handleVistaNotas();
    }

    return (
        <>
            <button onClick={handleOrder}>Ordenar por title</button>
            <button onClick={handleVista}>Cambiar vista</button>
            <ul>
                {notas && notas.map(note => (
                    <NoteItem note={note} showDetail={showDetail} handleEditNote={handleEditNote} deleteNote={deleteNote} />
                ))}
            </ul>
        </>
    );
}
