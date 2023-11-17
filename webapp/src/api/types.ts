import {UserType} from "/src/style.ts";

export type Robot = {
    bid: string
    name: string
    description: string
}

export type RobotInstance = {
    token: string
    bid: string
    name: string
    messages: Message[]
}

export enum TabType {addFriends, joinGroup, createGroup}

export type Message = {
    sender: UserType
    messageText: string
    messageTime: string
}

