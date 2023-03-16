import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../hooks/useApi";

export default function DetailNote() {

    //const user = useContext(User);
    const token = JSON.parse(localStorage.getItem("token"));
    const [notaId, setNotaId] = useState("");
    let request = useApi(`/api/notes/${notaId}`, token, {}, false);

    let params = useParams()

    useEffect(() => {
        console.log(params.id)
        setNotaId(params.id);
        request.perform();
    }, []);

  return (
    <div>
        <h3>Detalle de la nota</h3>
        <div>
        {request.data &&
        <>
            <p>Title: {request.data.title}</p>
            <p>Content: {request.data.content}</p>
        </> 
        }
        </div>
    </div>
  )
}
