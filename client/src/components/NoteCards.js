import React from 'react'
import NoteItem from './NoteItem';
import {useState, useEffect} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export function NoteCards({notes, showDetail, handleEditNote, deleteNote, handleVistaNotas}) {
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
            <div className='cards'>
                {notas && notas.map(note => (
                    <Card sx={{ minWidth: 275, }} className="card">
                        <CardContent>                                                    
                            <NoteItem note={note} showDetail={showDetail} handleEditNote={handleEditNote} deleteNote={deleteNote} />
                        </CardContent>
                    </Card>
                ))}
            </div>

        </>
    );
}
