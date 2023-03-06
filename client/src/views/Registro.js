import { useRef, useState, useContext, useEffect } from "react";
import { DEFAULT_STATE } from "../constants/form";
import './Autenticacion.css';
import User from "../contexts/user";
import useApi from "../hooks/useApi";
import Notes from "../components/Notes";

const Registro = () => {
    const [formState, setFormState] = useState(DEFAULT_STATE);
    const user = useContext(User);
    const registroRequest = useApi("/api/register", "", {}, false);
    const nameRef = useRef(null);
    const passwordRef = useRef(null);

    let token;
    if (registroRequest.data) {
        token = registroRequest.data.token;
    }

    useEffect(() => {
        user.updateUser(true); 
      }, [token]);

    const onSubmit = (e) => {
        e.preventDefault();
        registroRequest.updateParams({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: nameRef.current.value,
                password: passwordRef.current.value,
            }),
        });
        registroRequest.perform();
    }

    return (
        <div>
            {registroRequest.data && registroRequest.data.token ? (
                <Notes />
            ) : (
                <div className="centrado">
                    <div>
                        <form onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="name">Nombre</label>
                                <input ref={nameRef} id="name" type="text"
                                    defaultValue={formState.name} />
                            </div>
                            <div>
                                <label htmlFor="name">Contraseña</label>
                                <input ref={passwordRef} id="password" type="text"
                                    defaultValue={formState.password} />
                            </div>
                            <div>
                                <button>Registrarse</button>
                            </div>
                        </form>
                    </div>
                    {registroRequest.error && <p className="error">{registroRequest.error}</p>}
                </div>
            )}
        </div>
    );
}

export default Registro;