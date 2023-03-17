import React from 'react'
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import useApi from "../hooks/useApi";

export default function EditNote() {

    const token = JSON.parse(localStorage.getItem("token"));
    const [notaId, setNotaId] = useState("");
    let request = useApi(`/api/notes/${notaId}`, token, {}, false);
    let editRequest = useApi(`/api/notes/${notaId}`, token, {}, false);

    const [note, setNote] = useState([]);
    const [editar, setEditar] = useState(false);
    
    const navigate = useNavigate();
    const editNotaRef = useRef();

    let params = useParams();

    useEffect(() => {
        setNotaId(params.id);
        request.perform();
    }, []);

    useEffect(() => {
        if(request.data){
            setNote(request.data);
        }
    }, [request.data]);

    useEffect(() => {
        editRequest.updateParams({
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: note.title,
                content: note.content,
            }),
        });   
        editRequest.perform();
    }, [editar]);

    const editNote = () => {
        const titulo = editNotaRef.current.value;
        note.title = titulo;
        setEditar(true);
    }

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div>
            <h3>Edición de la nota</h3>
            <div>
                <div className="addNota">
                    <input ref={editNotaRef} type="text" defaultValue={note.title}></input>

                    <button onClick={editNote}>Editar nota</button>
                </div> 
                <button onClick={handleBack}>Volver</button>
            </div>
        </div>
    )
}
