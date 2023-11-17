import {RobotInstance} from "/src/api/types.ts";
import {UserType} from "/src/style.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type State = {
    currentInstance: RobotInstance
}

const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
}
const formatDate = (date: Date) => {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        'T' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}

const emptyInstance: RobotInstance = {bid: "", name: "", token: "", messages: []}

const initialState: State = {
    currentInstance: emptyInstance
}

export const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
        switchInstance: (state, action: PayloadAction<RobotInstance>) => {
            return {...state, currentInstance: action.payload}
        },
        addMessage: (state, action: PayloadAction<{ messageText: string, sender: UserType }>) => {
            const {messageText, sender} = action.payload;
            state.currentInstance.messages.push({
                messageText,
                messageTime: formatDate(new Date()),
                sender,
            })
        }

    }
})
export const {switchInstance, addMessage} = viewSlice.actions

export default viewSlice.reducer
