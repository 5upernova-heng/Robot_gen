import {listRobotSchema} from "/src/api/robotApi.ts";
import {Robot, RobotInstance} from "/src/api/types.ts";
import {AppDispatch, RootState} from "/src/app/store.ts";
import {UserType} from "/src/style.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


type State = {
    schema: Robot[]
    instances: RobotInstance[]
    currentInstance: string // token
    socket: WebSocket | null
}

const initialState: State = {
    schema: [],
    instances: [],
    socket: null,
    currentInstance: ""
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

export const fetchSchemas = createAsyncThunk<{ robots: Robot[] }, void, { state: RootState, dispatch: AppDispatch }>(
    'robot/fetchSchemas',
    async () => {
        return await listRobotSchema();
    }
)

export const robotSlice = createSlice({
    name: "robot",
    initialState,
    reducers: {
        addInstance: (state, action: PayloadAction<RobotInstance>) => {
            state.instances.push(action.payload);
        },
        switchInstance: (state, action: PayloadAction<string>) => {
            return {...state, currentInstance: action.payload}
        },
        addMessage: (state, action: PayloadAction<{ messageText: string, sender: UserType }>) => {
            const {messageText, sender} = action.payload;
            const index = state.instances.findIndex((instance) => instance.token === state.currentInstance)
            state.instances[index].messages.push({
                messageText,
                messageTime: formatDate(new Date()),
                sender,
            })
        },
        setSocket: (state, action: PayloadAction<WebSocket>) => {
            return {...state, socket: action.payload}
        },
        closeSocket: (state) => {
            state.socket?.close();
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchSchemas.fulfilled, (state, action) => {
                return {...state, schema: action.payload.robots}
            })
    }
})

export const {addInstance, switchInstance, addMessage, setSocket, closeSocket} = robotSlice.actions

export default robotSlice.reducer
