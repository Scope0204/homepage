import React, { useState } from "react";
import { authService } from "fbase";

const AuthForm = () => {

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

    return (
        <>
            <form onSubmit={onSubmit} className="container">

                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} className="authInput" />
                <input name="password" type="password" placeholder="password" required value={password} onChange={onChange} className="authInput" />
                <input type="submit" className="authInput authSubmit" value={newAccount ? "회원가입" : "로그인"} />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch"> {newAccount ? "로그인" : "회원가입"}</span>
        </>
    );
}

export default AuthForm;