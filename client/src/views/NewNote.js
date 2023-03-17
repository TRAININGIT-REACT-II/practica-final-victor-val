import React from 'react'
import { useRef} from "react";

export default function NewNote({handleAddNota}) {

    const titleNotaRef = useRef();
    const contentNotaRef = useRef();

    const newNote = () => {
        handleAddNota(titleNotaRef.current.value, contentNotaRef.current.value);
        titleNotaRef.current.value = null;
        contentNotaRef.current.value = null;
    }

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
