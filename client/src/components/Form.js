import { useRef, useState } from "react";
import { DEFAULT_STATE } from "../constants/form";

const Form = () => {
    const [formState, setFormState] = useState(DEFAULT_STATE);

    const nameRef = useRef(null);
    const passwordRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        setFormState({
            ...DEFAULT_STATE,
            name: nameRef.current.value,
            password: passwordRef.current.value
          });
    }

    return ( 
        <div className="row">
            <div className="col-6">
                <form onSubmit={onSubmit}>
                    <label htmlFor="name">Nombre</label>
                    <input ref={nameRef} id="name" type="text"
                        defaultValue={formState.name} />
                    <label htmlFor="name">Contraseña</label>
                    <input ref={passwordRef} id="password" type="text"
                        defaultValue={formState.password} />
                    <button>Registrar</button>
                </form>
            </div>
            <div className="col-6">
                <pre>
                    <code>
                        {JSON.stringify(formState, null, 2)}
                    </code>
                </pre>
            </div>
        </div>
     );
}
 
export default Form;