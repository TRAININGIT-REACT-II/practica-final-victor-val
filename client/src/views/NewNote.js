import React from 'react'
import { useRef} from "react";

export default function NewNote({handleAddNota}) {

    const addNotaRef = useRef();

    const newNote = () => {
        handleAddNota(addNotaRef.current.value);
        addNotaRef.current.value = null;
    }

    return (
        <div className="addNota">
            <input ref={addNotaRef} type="text" placeholder='Nueva nota'></input>
            <button onClick={newNote}>Añadir nota</button>
        </div> 
    )
}
