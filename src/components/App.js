import React, { useEffect, useState } from 'react';
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
    const [init, setInit] = useState(false); // 파이어베이스가 프로그램을 아직 초기화하지않음 -> 초기화 기다림
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);


    useEffect(() => {
        authService.onAuthStateChanged((user) => {  // auth sdk , onAuthStateChanged() : 유저 상태 변화를 알아차리는 메서드 
            if (user) {
                setIsLoggedIn(true);
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: (args) => user.updateProfile(args),
                });
            }
            else {
                setUserObj(null);
            }
            setInit(true);
        });
    }, []); // serEffect() : hook , user의 변화에 따라 변경 (로그인 됫는지안됫는지)
    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
        });
    };


    return (
        <>
            {init ? <AppRouter
                refreshUser={refreshUser}
                isLoggedIn={Boolean(userObj)}
                userObj={userObj}
            /> : "초기화 중..."}
        </>
    );
}

export default App;
