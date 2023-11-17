import {listRobotSchema} from "/src/api/robotApi.ts";
import {Robot, RobotInstance} from "/src/api/types.ts";
import {AppDispatch, RootState} from "/src/app/store.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


type State = {
    schema: Robot[]
    instances: RobotInstance[]
    socket: WebSocket | null
}

const initialState: State = {
    schema: [],
    instances: [],
    socket: null
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

export const {addInstance, setSocket, closeSocket} = robotSlice.actions

export default robotSlice.reducer
