import {UserType} from "/src/style.ts";

export type Robot = {
    bid: string
    name: string
    description: string
    opening: string
}

export type RobotInstance = {
    token: string
    bid: string
    name: string
    messages: Message[]
}

export type Message = {
    sender: UserType
    messageText: string
    messageTime: string
}

