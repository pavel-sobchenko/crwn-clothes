import { useState } from "react";
import {createSignInWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.util';
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sing-up-form.styles.scss';

const defaultFormValues = {
    displayName: '',
    email: '',
    password:'',
    confirmPassword: ''
}


const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormValues);
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('passwords are not equal');
            return;
        }

        try {
            const {user} = await createSignInWithEmailAndPassword(email, password);
            console.log(user);
            await createUserDocumentFromAuth(user, { displayName });
        } catch(err) {
            // eslint-disable-next-line no-undef
            if (error.code === 'auth/email-already-in-user') {
                alert('cannot create user, email is already busy');
            } else {
                console.log(err);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({
            ...formFields,
            [name]: value
        });
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type='text' required onChange={handleChange} name="displayName" value={displayName} />
                
                <FormInput label="Email" type='email' required  onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" type='password' required  onChange={handleChange} name="password" value={password} />

                <FormInput label="Confirm Password" type='password' required  onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button buttonType='google' type="submt">Sign Up</Button>
            </form>
        </div>
    );
}


export default SignUpForm;