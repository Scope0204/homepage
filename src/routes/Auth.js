import { authService } from "fbase";
import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");


    const onChange = (event) => {
        console.log(event.target.name);
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        //preventDefault() : 기본행위가 실행되는 걸 원치않음 -> 내가 컨트롤하기 위해 
        try {
            let data;
            if (newAccount) {
                //create account
                data = await authService.createUserWithEmailAndPassword(email, password);
            }
            else {
                // log in
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }
        catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount(prev => !prev);

    return (
        <div>
            <form onSubmit={onSubmit}>

                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log in"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Log in" : "Create Account"}</span>
            <div>
                <button>Google</button>
                <button>GitHub</button>
            </div>
        </div>
    )
}
export default Auth;