import { ProfileUser } from "./user-profile";
import { Timestamp } from "firebase/firestore";
export interface Chat{
    id: string;
    lastMessage?: string;
    lastMessageDate:Date & Timestamp;
    userIds: string[];
    users: ProfileUser[];

    //###############
    chatPic?:string;
    chatName?:string;
}

export interface Message{
    text:string;
    senderId:string;
    sentDate:Date & Timestamp;
}