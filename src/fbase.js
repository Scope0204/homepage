import * as firebase from "firebase/app";
import "firebase/auth"; //사용자인증 - 로그인
import "firebase/firestore"; //데이터베이스(파베는 NoSQL DB)
import "firebase/storage"; //사진 저장

//NoSql 구조 : 1. Collection(폴더)  2. Document(문서)
//Collection은 여러개의 Doucment의 그룹임

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();

