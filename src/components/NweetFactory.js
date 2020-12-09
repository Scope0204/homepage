import React, { useState } from "react";
import { storageService, dbService } from "fbase";
import { v4 as uuidv4 } from "uuid"; // uuid : 특별한 식별자를 랜덤으로 생성해줌
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";


const NweetFactory = ({ userObj }) => {

    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");


    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = ""; //사진을 선택하지않으면 이대로 비어있는 String값
        if (nweet === "") {
            return;
        }

        if (attachment !== "") { //이미지를 선택하지 않을 때
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }

        const nweetObj = {
            text: nweet, //작성 글
            createdAt: Date.now(), //작성시간
            creatorId: userObj.uid, //사용자아이디
            attachmentUrl //사진url(string)
        }

        //firebase.firestore
        //conllection(컬랙션경로).add() : 명시된 데이터를 담은 새로운 document를 collection에 추가(id도 자동 추가)
        //C(Create)
        await dbService.collection("nweets").add(nweetObj);
        setNweet(""); // 작성후 기존 nweet을 초기화 -> form태그의 내용이 사라짐 
        setAttachment(""); //사진을 고르고 업로드시에는 아무것도 안함
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

    // Preview Images
    const onFileChange = (event) => {
        //es6
        const { target: { files }, } = event;

        const theFile = files[0]; //하나의 파일만을 담기위함
        // console.log(theFile);

        //fileReader API : 파일 이름을 읽어줌
        const reader = new FileReader();

        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
            const { currentTarget: { result }, } = finishedEvent;
            setAttachment(result); // 사진 정보의 문자열을 저장
        }
        if (theFile) {
            reader.readAsDataURL(theFile);
        } // 문자열을 파일로 바꿔줌
    }

    //선택한 미리보기 사진 삭제
    const onClearAttachment = () => setAttachment("");

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label for="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>

            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />

            {attachment && (
                <div className="factoryForm__attachment">
                    <img
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    )
}

export default NweetFactory;