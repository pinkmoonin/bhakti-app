import { addDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { StoryInputs } from "./AddStoryDialog";

export async function deleteStoryFromDb(storyId: string) {
    await deleteDoc(doc(db, "story", storyId));
}

export async function addStoryToDb(story: StoryInputs) {
    const data = {
        ...story,
        god: story.god.toLowerCase(),
        likeCount: 0,
        timestamp: serverTimestamp()
    }
    return await addDoc(collection(db, "story"), data)
}