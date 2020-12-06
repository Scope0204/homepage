import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

export default () => {
    const history = useHistory(); // useHistory() : router hook , history 변수 생성 후 push 하면 됨 
    const onLogOutClick = () => {
        authService.signOut(); // 로그아웃
        history.push("/"); //
    };

    return (
        <>
            <button onClick={onLogOutClick}>
                Log Out
            </button>
        </>
    )

};
