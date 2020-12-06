import { authService, firebaseInstance } from "fbase";
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
                // Sign In
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }
        catch (error) {
            setError(error.message);
        }
    };

    // 회원가입 - 로그인 전환 버튼 
    const toggleAccount = () => setNewAccount(prev => !prev); // true->false / false->true

    // 소셜 로그인 
    const onSocialClick = async (event) => {
        const { target: { name } } = event; //es6문법
        let provider; //firebase pup-up을 사용하기 위해서는 provider를 선언해줘야함
        if (name == "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        else if (name == "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
        console.log(provider);

    }

    return (
        <div>
            <form onSubmit={onSubmit}>

                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button >
                <button onClick={onSocialClick} name="github">Continue with GitHub</button>
            </div>
        </div>
    )
}
export default Auth;