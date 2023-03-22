import React from 'react'
import { useRef, useEffect, useState} from "react";
import { useNavigate } from "react-router";
import { Note } from "../models/Note";
import useApi from '../hooks/useApi';

export default function NewNote() {
    const token = JSON.parse(localStorage.getItem("token"));
    const titleNotaRef = useRef();
    const contentNotaRef = useRef();
    const [note, setNote] = useState();
    const [enviarNota, setEnviarNota] = useState(false);
    let notesInsertRequest = useApi("/api/notes", token, {}, false);
    const navigate = useNavigate();

    const newNote = () => {
        handleAddNota(titleNotaRef.current.value, contentNotaRef.current.value);
        titleNotaRef.current.value = null;
        contentNotaRef.current.value = null;
    }

    const handleAddNota = (title, content) => {
        const note = new Note(title, content);
        setNote(note);
        if(note && (note.title === '' || note.content === '')) return;
        setEnviarNota(true);         
    }

    useEffect(() => {
        if(enviarNota){ 
            notesInsertRequest.updateParams({
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: note.title,
                    content: note.content,
                }),
            });        
            notesInsertRequest.perform();
        }
    }, [enviarNota]);

    useEffect(() => {
        if(notesInsertRequest.data){
            handleGoNotes();
        }
    }, [notesInsertRequest.data]);

    const handleGoNotes = () => {
        navigate('/notes');
      };

    return (
        <div className="addNota">
            <h5>Añadir nueva nota: </h5>
            <input ref={titleNotaRef} type="text" placeholder='Title'></input>
            <div className="sepArr">
                <textarea ref={contentNotaRef} type="text" placeholder='Content'></textarea>
            </div>
            <button onClick={newNote}>Añadir nota</button>
        </div> 
    )
}
