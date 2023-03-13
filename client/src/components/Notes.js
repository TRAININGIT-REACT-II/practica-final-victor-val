import { useContext, useEffect, useRef, useState} from "react";
import { NoteList } from "./NoteList";
import User from "../contexts/user";
import useApi from "../hooks/useApi";

const Notes = () => {
    const user = useContext(User);
    const token = JSON.parse(localStorage.getItem("token"));
    let notesRequest = useApi("/api/notes", token, {}, false);
    let notesInsertRequest = useApi("/api/notes", token, {}, false);
    const addNotaRef = useRef();
    const [enviarNota, setEnviarNota] = useState(false);

    const [notes, setNotes] = useState([]);
    let nota;

    const fetchNotes = () => {
        notesRequest.perform();
    }
    
    useEffect(() => {
        if(notesRequest.data){
            const data = [...notesRequest.data];
            notesRequest.data = null;
            setNotes(data);
        }
    }, [notesRequest.data]);

    useEffect(() => {
        if(notesInsertRequest.data){        
            if(enviarNota){
                setEnviarNota(false);                
                setNotes(
                    [...notes,
                    notesInsertRequest.data]
                );
                notesInsertRequest.data = null;
            }
          
        }
    }, [notesInsertRequest.data]);

    useEffect(() => {
        fetchNotes();
    }, [token]);

    useEffect(() => {
        if(enviarNota){
            const nota = addNotaRef.current.value;       
            notesInsertRequest.updateParams({
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: nota,
                    content: nota,
                }),
            });
            addNotaRef.current.value = null;
            notesInsertRequest.perform();
        }
    }, [enviarNota]);

    const handleAddNota = () => {
        nota = addNotaRef.current.value;
        if(nota === '') return;
        setEnviarNota(true);         
    } 

    return (
        <div>
            <h3>
                Notas (seccion privada)
            </h3>

            <NoteList notes={notes}/>

            <div className="addNota">
                <input ref={addNotaRef} type="text" placeholder='Nueva nota'></input>
                <button onClick={handleAddNota}>Añadir nota</button>
            </div>
            
            
        </div>
    );
}

export default Notes;