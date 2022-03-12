import styles from "./Login.module.css"
// import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { auth, googleProvider } from '../../utils/firebaseConfig';

function LoginModule() {

    // const history = useHistory();
    const[values,setValues] = useState({
        email: "",
        password: "",
    });

    const handleOnChange = (event) => {
        const { value, name: inputName } = event.target;
        console.log({ inputName, value });
        setValues({ ...values, [inputName]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await auth.signInWithEmailAndPassword(values.email, values.password);
        history.push('/');
    };

    const handleGoogleLogin = async () => {
        await auth.signInWithPopup(googleProvider);
        history.push('/');
      };

    return (
        <div className={styles.container}>
            <div className = {styles.formContainer}>
                <form onSubmit= {handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email"><h3>Enter your email</h3></label>
                        <input 
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={values.email}
                            onChange={handleOnChange}
                            />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password"><h3>Enter your password</h3></label>
                        <input 
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={handleOnChange}
                            />
                    </div>
                    <button type="submit" onClick={handleSubmit}>
                    Send
                    </button>
                </form>
                <button type="button" onClick={handleGoogleLogin}>
                    <img className={styles.iconPic} src ="https://cdn.discordapp.com/attachments/374315817854173186/951963394842460180/google.png"></img>
                </button>
            </div>    
        </div>
    );
}

export default LoginModule;