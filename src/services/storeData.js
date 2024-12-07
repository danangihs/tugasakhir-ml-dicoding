import { initializeApp } from 'firebase/app';
import "firebase/firestore";
import { getFirestore, collection, setDoc, doc, query, getDocs } from "firebase/firestore";

const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);

export async function add(id, data) {
	const db = getFirestore(app, "predict-cancer");
    const coll = collection(db, "predictions");
    const docs = doc(coll, id);
    await setDoc(docs, data);
}

export async function get() {
    const data = [];
	const db = getFirestore(app, "predict-cancer");
	const coll = collection(db, "predictions");
    const q = query(coll);
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
}