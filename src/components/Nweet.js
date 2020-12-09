import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {

    const [editing, setEditing] = useState(false); // 수정 모드할지 안할지
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log(ok);
        if (ok) {
            //firebase.firestore
            //doc(`컬렉션이름/도큐먼트id`).delete()
            //D(Delete) 
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev); // 이전의 내용가져옴

    //firebase.firestore
    //doc(`컬렉션이름/도큐먼트id`).update()
    //U(Update) 
    const onSubmit = async (event) => {
        event.preventDefault();
        // console.log(nweetObj, newNweet);
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet // newNweet : input에 작성한 text
        });
        setEditing(false); // 수정모드를 풀기위해서
    }
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    }

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Edit your nweet"
                            value={newNweet}
                            required
                            onChange={onChange}
                        />
                        <input type="submit" value="Update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            )
                : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete</button>
                                <button onClick={toggleEditing}>Edit</button>
                            </>
                        )}
                    </>
                )
            }
        </div >
    );
};

export default Nweet;