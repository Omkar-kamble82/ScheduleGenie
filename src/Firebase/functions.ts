import { GoogleAuthProvider, signInWithPopup, signOut, getAuth } from "firebase/auth";
import { auth, db } from "./config";
import { toast } from "sonner"
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { formSchema } from "@/pages/CreateSchedule";
import { z } from "zod";

export type ScheduleType = {
    id: string,
    useremail: string,
    userSeletion: {
        days: number,
        hours: number,
        task: string,
        title: string
    },
    scheduledata: {
        day1?: {
            afternoon: [{
                description: "",
                duration: "",
                task: ""
            }],
            morning: [{
                description: "",
                duration: "",
                task: ""
            }]
        }
        day2?: {
            afternoon: [{
                description: "",
                duration: "",
                task: ""
            }],
            morning: [{
                description: "",
                duration: "",
                task: ""
            }]
        }
        day3?: {
            afternoon: [{
                description: "",
                duration: "",
                task: ""
            }],
            morning: [{
                description: "",
                duration: "",
                task: ""
            }]
        }
        day4?: {
            afternoon: [{
                description: "",
                duration: "",
                task: ""
            }],
            morning: [{
                description: "",
                duration: "",
                task: ""
            }]
        }
        day5?: {
            afternoon: [{
                description: "",
                duration: "",
                task: ""
            }],
            morning: [{
                description: "",
                duration: "",
                task: ""
            }]
        }
        day6?: {
            afternoon: [{
                description: "",
                duration: "",
                task: ""
            }],
            morning: [{
                description: "",
                duration: "",
                task: ""
            }]
        }
        day7?: {
            afternoon: [{
                description: "",
                duration: "",
                task: ""
            }],
            morning: [{
                description: "",
                duration: "",
                task: ""
            }]
        }
        day8?: {
            afternoon: [{
                description: "",
                duration: "",
                task: ""
            }],
            morning: [{
                description: "",
                duration: "",
                task: ""
            }]
        }
        day9?: {
            afternoon: [{
                description: "",
                duration: "",
                task: ""
            }],
            morning: [{
                description: "",
                duration: "",
                task: ""
            }]
        }
        day10?: {
            afternoon: [{
                description: "",
                duration: "",
                task: ""
            }],
            morning: [{
                description: "",
                duration: "",
                task: ""
            }]
        }
    }
}

export const Login = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const Logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        localStorage.removeItem("schedules")
        localStorage.removeItem("user")
        localStorage.removeItem("schedule")
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
    
};

export const setSchedule = async (result: string, values: z.infer<typeof formSchema>) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        toast.error("User not authenticated");
        return;
    }
    const docId = Date.now().toString();
    try {
        const username = user.email as string;
        const docRef = doc(db, "UsersSG", username);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            await setDoc(docRef, {
                username: user.displayName as string,
                email: username,
                photoURL: user.photoURL,
                schedules: []
            });
        }
        await setDoc(doc(db, "Schedules", docId), {
            userSeletion: values,
            scheduledata: JSON.parse(result),
            useremail: user.email,
            id: docId
        })
        const docSnapuser = await getDoc(docRef);
        if (!docSnapuser.exists()) return;
        const schedules: string[] = docSnapuser.data().schedules
        schedules.push(docId)
        await updateDoc(docRef, {
            schedules: schedules
        })
        await getSchedules()
        return docId
    } catch {
        toast.error("Error creating scheduling");
    }
}

export const getSchedule = async (id: string) => {
    try {
        const docRef = doc(db, "Schedules", id)
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return null;
        localStorage.setItem('schedule', JSON.stringify(docSnap.data()))
        return docSnap.data() as ScheduleType
    } catch {
        toast.error("Error getting schedule")
    }
}

export const getSchedules = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        toast.error("User not authenticated");
        return;
    }
    try {
        const username = user.email as string;
        const docRef = doc(db, "UsersSG", username);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()){
            localStorage.setItem("schedules", JSON.stringify([]))
            return []
        };
        const q = query(collection(db, "Schedules"), where("useremail", "==", username))
        const scheduleData = await getDocs(q)
        const schedulesarr: ScheduleType[] = [];
        scheduleData.forEach((doc) => {
            const schedule = doc.data() as ScheduleType
            schedulesarr.push(schedule);
        });
        localStorage.setItem('schedules', JSON.stringify(schedulesarr))
        localStorage.setItem('user', JSON.stringify(docSnap.data()))
        return schedulesarr
    } catch {
        toast.error("Something went wrong")
    }
}

export const DeleteSchedule = async (id: string) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        toast.error("User not authenticated");
        return;
    }

    try {
        const username = user.email as string
        const docRefschedule = doc(db, "UsersSG", username)
        const docSnapschedule = await getDoc(docRefschedule)
        if (!docSnapschedule.exists()) return;
        const schedules: string[] = docSnapschedule.data().schedules
        const sch: string[] = schedules.filter(sched => sched !== id)
        await updateDoc(docRefschedule, {
            schedules: sch
        })
        await deleteDoc(doc(db, "Schedules", id))
        await getSchedules()
        toast.success("Schedules deleted successfully")
    } catch {
        toast.error("Error deleting schedule")
    }
}