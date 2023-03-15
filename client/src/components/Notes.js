import { useContext, useEffect, useRef, useState} from "react";
import { NoteList } from "./NoteList";
import Modal from "./Modal";
import User from "../contexts/user";
import useApi from "../hooks/useApi";

const Notes = () => {
    const user = useContext(User);
    const token = JSON.parse(localStorage.getItem("token"));

    const addNotaRef = useRef();
    const [enviarNota, setEnviarNota] = useState(false);
    const [borrarNota, setBorrarNota] = useState(false);
    const [notes, setNotes] = useState([]);
    const [notaId, setNotaId] = useState("");

    let notesRequest = useApi("/api/notes", token, {}, false);
    let notesInsertRequest = useApi("/api/notes", token, {}, false);
    let deleteRQ = useApi(`/api/notes/${notaId}`, token, {}, false);

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    let nota;

    const fetchNotes = () => {
        notesRequest.perform();
    }

    if(notesRequest.error || notesInsertRequest.error || deleteRQ.error){
        throw new Error("Error");
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

    const handleDeleteNote = (id) => {
        setNotaId(id);
        openModal();              
    }

    const deleteNote = () => {
        setBorrarNota(true);
        closeModal();
    }

    useEffect(() => {  
        if(borrarNota){
            setBorrarNota(false);
            deleteRQ.updateParams({
                method: "DELETE",
            });
            deleteRQ.perform();
            let notesAux = [...notes];
            notesAux = notesAux.filter((item) => item.id !== notaId)
            setNotes(notesAux);
            
        }        
    }, [borrarNota]);

    return (
        <div>
            <h3>
                Notas (seccion privada)
            </h3>

            <NoteList notes={notes} deleteNote={handleDeleteNote}/>

            <div className="addNota">
                <input ref={addNotaRef} type="text" placeholder='Nueva nota'></input>
                <button onClick={handleAddNota}>Añadir nota</button>
            </div>            
            
            <Modal show={showModal} onClose={closeModal}>
                <h3>Borrar nota</h3>
                <p>Confirma que desea borrar esta nota?</p>
                <button onClick={deleteNote}>Aceptar</button>
                <button onClick={closeModal}>Cancelar</button>
            </Modal>
        </div>
    );
}

export default Notes;