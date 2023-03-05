import { useRef, useState, useContext } from "react";
import { useNavigate} from 'react-router-dom';
import { DEFAULT_STATE } from "../constants/form";
import './Login.css';
import User from "../contexts/user";

const Registro = () => {
    const [formState, setFormState] = useState(DEFAULT_STATE);
    const user = useContext(User);
    const navigate = useNavigate();

    const nameRef = useRef(null);
    const passwordRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        user.updateUser(true);
        setFormState({
            ...DEFAULT_STATE,
            name: nameRef.current.value,
            password: passwordRef.current.value
          });
          navigate('/notes');
    }

    return ( 
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
        </div>
     );
}
 
export default Registro;