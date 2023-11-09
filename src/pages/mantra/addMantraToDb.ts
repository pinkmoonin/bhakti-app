import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { MantraInputs } from "./AddMantraDialog";
import { collection, deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";

async function uploadFileToStorage(
    file: File,
    id: string
): Promise<string> {

    return await uploadBytes(ref(storage, `mantra/${id}`), file).then((result) => {
        return getDownloadURL(result.ref)
    });
}

export async function addMantraToDb(inputs: MantraInputs, file: File | null) {
    if (!file) {
        throw Error("Invalid mantra file");
    }
    const docRef = doc(collection(db, "mantra"));

    const mediaUrl = await uploadFileToStorage(file, docRef.id);

    const data = {
        ...inputs,
        god: inputs.god.toLowerCase(),
        timestamp: serverTimestamp(),
        lyrics: inputs.lyrics.replaceAll('\n', "\\n"),
        mediaUrl: mediaUrl
    }

    return await setDoc(docRef, data);
}

export async function deleteMantraFromDb(mantraId: string) {
    return await deleteObject(ref(storage, `mantra/${mantraId}`)).then(() => {
        deleteDoc(doc(db, "mantra", mantraId));
    });
}
