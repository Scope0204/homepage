import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {

    const [nweets, setNweets] = useState([]); // 배열

    //Realtime  
    useEffect(() => {
        // snapshot : 데이터베이스 리얼타임이 가능하게 해줌(R)
        //.orderBy("createdAt", "desc")  : doc ID 정렬은 랜덤이므로 날짜기준 내름차순 정렬 불러오기 함수 적용
        dbService.collection("nweets").orderBy("createdAt", "desc").onSnapshot(snapshot => {
            console.log(snapshot.docs);
            const nweetArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), }));
            setNweets(nweetArray);
        })
    }, []);



    return (
        <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};
export default Home;