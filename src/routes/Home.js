import Nweet from "components/Nweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]); // 배열

    // //방법 1 forEach를 사용
    // const getNweets = async () => {
    //     //firebase.firestore
    //     //conllection(컬랙션경로).get() 
    //     //R(Read)
    //     const dbNweets = await dbService.collection("nweets").get();
    //     dbNweets.forEach((document) => {
    //         const nweetObject = {
    //             ...document.data(), //es6 spread attribute 기능 , document.data()의 모든 데이터를 가져와서 풀어냄
    //             id: document.id,
    //         }
    //         setNweets((prev) => [nweetObject, ...prev]);
    //         //최신 document.data()를 붙이고 그뒤로 ...prev => 이전의 document.data()를 차례로 붙임  
    //     }
    //     );
    // }

    //방법 2 Realtime  
    useEffect(() => {
        // snapshot : 데이터베이스 리얼타임이 가능하게 해줌
        dbService.collection("nweets").onSnapshot(snapshot => {
            console.log(snapshot.docs);
            const nweetArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), }));
            setNweets(nweetArray);
        })
    }, []);



    const onSubmit = async (event) => {
        event.preventDefault();

        //firebase.firestore
        //conllection(컬랙션경로).add() : 명시된 데이터를 담은 새로운 document를 collection에 추가(id도 자동 추가)
        //C(Create)
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid, // App.js로 부터 저장한 user정보를 받아와서 쓰고있음
        });
        setNweet(""); // 작성후 기존 nweet을 초기화 -> form태그의 내용이 사라짐 
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
    };
    console.log(nweets);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="Nweet" />
            </form>
            {nweets.map((nweet) => (
                <Nweet
                    key={nweet.id}
                    nweetObj={nweet}
                    isOwner={nweet.creatorId === userObj.uid}
                />
            ))}
        </div>
    );
};
export default Home;