import styles from "./Login.module.css"
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { auth, googleProvider } from '../../utils/firebaseConfig';
import { sessionContext } from '../../context/SessionContext';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"

function LoginModule() {

    const navigate = useNavigate();
    const [session, setSession] = useContext(sessionContext)
    const[values,setValues] = useState({
        email: "",
        password: "",
    });

    const handleOnChange = (event) => {
        const { value, name: inputName } = event.target;
        setValues({ ...values, [inputName]: value });
    }

    const sessionCheck = (response) => {
        const user =
        {
          name: response.user.displayName,
          email: response.user.email,
          id: response.user.uid
        }
        setSession(user);
        navigate("/movies?page=1&&search=")
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await signInWithEmailAndPassword(auth,
        values.email,
        values.password
    ).catch((error) => {
        // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong Password');
      } 
      else if (errorCode == 'auth/user-not-found'){
        alert('Wrong email, please Register the email first');
      }
      else {
        alert(errorMessage);
      }
      console.log(error);
      })  
      sessionCheck(response)
    };

    const handleGoogleLogin = async () => {
        const response = await signInWithPopup(auth, googleProvider);
        sessionCheck(response)
    };


    return (
        <div className={styles.container}>
            <div className = {styles.formContainer}>
                <div className = {styles.styling}>
                    <h1 className={styles.title}>Login</h1>

                    <form onSubmit= {handleSubmit}>
                        <div className={styles.inputGroup}>
                            <input 
                                className={styles.inputs}
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={values.email}
                                onChange={handleOnChange}
                                />
                                
                        </div>
                        <div className={styles.inputGroup}>
                            <input 
                                className={styles.inputs}
                                name="password"
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={values.password}
                                onChange={handleOnChange}
                                />
                        </div>
                        <div className={styles.inputGroup}>
                            <button className={styles.submits} type="submit" onClick={handleSubmit}>
                                Log in
                            </button>
                
                            <button className={styles.submits} type="button" onClick={handleGoogleLogin}>
                                <img className={styles.iconPic} src ="https://cdn.discordapp.com/attachments/374315817854173186/951963394842460180/google.png"></img>
                            </button>   
                        </div>
                        
                    </form>
                    
                </div>

            </div>    
        </div>
    );
}

export default LoginModule;