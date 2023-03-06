import { useRef, useState, useContext, useEffect } from "react";
import { DEFAULT_STATE } from "../constants/form";
import './Autenticacion.css';
import User from "../contexts/user";
import useApi from "../hooks/useApi";
import Notes from "../components/Notes";

const Login = () => {
    const [formState, setFormState] = useState(DEFAULT_STATE);
    const user = useContext(User);
    const loginRequest = useApi("/api/login", "", {}, false);
    const nameRef = useRef(null);
    const passwordRef = useRef(null);

    let token;
    if (loginRequest.data) {
        token = loginRequest.data.token;        
    }

    useEffect(() => {
        user.updateUser(true); 
      }, [token]);

    const onSubmit = (e) => {
        e.preventDefault();
        loginRequest.updateParams({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: nameRef.current.value,
                password: passwordRef.current.value,
            }),
        });
        loginRequest.perform();
    }

    return ( 
        <div>
            {loginRequest.data && loginRequest.data.token ? (
                <Notes/>
            ):(
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
                            <button>Iniciar sesión</button>
                        </div>                    
                    </form>
                </div>
                {loginRequest.error && <p className="error">{loginRequest.error}</p>}
            </div>        
            )}
        </div>
     );
}
 
export default Login;