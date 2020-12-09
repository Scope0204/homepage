import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";

import { faHome } from "@fortawesome/free-solid-svg-icons";



const Auth = () => {

    // 소셜 로그인 
    const onSocialClick = async (event) => {
        const { target: { name } } = event; //es6문법
        let provider; //firebase pup-up을 사용하기 위해서는 provider를 선언해줘야함
        if (name == "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider(); //구글 provider
        }
        else if (name == "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider(); //깃헙 provider
        }
        await authService.signInWithPopup(provider);
        console.log(provider);

    }

    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faHome}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} color={"orange"} /></button >
                <button onClick={onSocialClick} name="github" className="authBtn">
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    )
}
export default Auth;