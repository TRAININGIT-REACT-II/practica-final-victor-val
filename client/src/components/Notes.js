import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState} from "react";
import { NoteList } from "./NoteList";
import Modal from "./Modal";
import User from "../contexts/user";
import useApi from "../hooks/useApi";

const Notes = () => {
    const user = useContext(User);
    const token = JSON.parse(localStorage.getItem("token"));
    
    const [borrarNota, setBorrarNota] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [editNote, setEditNote] = useState(false);
    const [addNote, setAddNote] = useState(false);
    const [notes, setNotes] = useState([]);
    const [notaId, setNotaId] = useState("");

    let notesRequest = useApi("/api/notes", token, {}, false);
    let deleteRQ = useApi(`/api/notes/${notaId}`, token, {}, false);

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    if(notesRequest.error || deleteRQ.error){
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
        notesRequest.perform();
    }, [token]);


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

    const handleDetail = (id) => {
        setNotaId(id);
        setShowDetail(true);
    }

    const handleEditNote = (id) => {
        setNotaId(id);
        setEditNote(true);
    }

    const handleAddNote = () => {
        setAddNote(true);
    };

    return (
        <div>
            <h3>
                Notas (sección privada)
            </h3>

            {showDetail && <Navigate to={`/notes/${notaId}`}/>}
            {editNote && <Navigate to={`/editnote/${notaId}`}/>}
            {addNote && <Navigate to={'/newnote'}/>}

            <NoteList notes={notes} 
                showDetail={handleDetail} 
                handleEditNote={handleEditNote} 
                deleteNote={handleDeleteNote
            }/>

            <button onClick={handleAddNote}>Añadir nota</button>
            
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