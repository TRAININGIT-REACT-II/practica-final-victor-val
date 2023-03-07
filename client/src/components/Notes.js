import { useContext, useEffect } from "react";
import User from "../contexts/user";
import useApi from "../hooks/useApi";

const Notes = () => {
    const user = useContext(User);
    const token = JSON.parse(localStorage.getItem("token"));
    let notesRequest = useApi("/api/notes", token, {}, false);

    let notes;
    if (notesRequest.data) {
        notes = notesRequest.data;
    }

    const fetchNotes = () => {
        notesRequest.perform();
    }

    useEffect(() => {
        fetchNotes();
    }, [token]);

    return (
        <div>
            <h3>
                Notas (seccion privada)
            </h3>

            {notes && notes.map(note => (
                <li>{note}</li>
            ))}
            
        </div>
    );
}

export default Notes;