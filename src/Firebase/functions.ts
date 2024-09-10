import { GoogleAuthProvider, signInWithPopup, signOut, getAuth } from "firebase/auth";
import { auth, db } from "./config";
import { toast } from "sonner"
import { doc, setDoc } from "firebase/firestore";
import { formSchema } from "@/pages/Createtrip";
import { z } from "zod";

export const Login = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const Logout = () => {
    const auth = getAuth();
    signOut(auth).catch((error) => {
        console.error("Error signing out:", error);
    });
};

export const setTrip = async (result: string, values: z.infer<typeof formSchema>) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        toast.error("Please log in to create a trip");
        return;
    }
    const docId = Date.now().toString();
    try {
        await setDoc(doc(db, "Trips", docId), {
            userSeletion: values,
            tripdata: JSON.parse(result),
            useremail: user.email,
            id: docId
        })
    } catch {
        toast.error("Error creating trip");
    }
}