import SignUpForm from "../../components/sing-up/sing-up-form.component";
import { signInWithGooglePopUp, createUserDocumentFromAuth  } from "../../utils/firebase/firebase.util";

const SignIn = () => {

    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopUp();
        const userDocRef = await  createUserDocumentFromAuth(user);
    } 

    return(
        <div>
            <h1>Sing In</h1>
            <button onClick={logGoogleUser}>sing in with google popup</button>
            <SignUpForm />
        </div>
    );
}

export default SignIn;