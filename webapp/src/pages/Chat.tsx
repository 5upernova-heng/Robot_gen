import {addInstanceApi} from "/src/api/robotApi.ts";
import {useAppDispatch, useAppSelector} from "/src/app/hooks.ts";
import RightBar from "/src/components/RightBar.jsx";
import SideBar from "/src/components/SideBar.jsx";
import MessageContainer from "/src/features/chat/MessageContainer.tsx";
import MessageInput from "/src/features/chat/MessageInput.tsx";
import {addInstance, closeSocket, setSocket} from '/src/features/robotSlice.ts'
import {addMessage} from "/src/features/viewSlice.ts";
import Modal from '/src/widgets/Modal.tsx'
import {useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";


function Chat() {
    const {currentInstance} = useAppSelector(state => ({...state.view,}))
    const {schema} = useAppSelector(state => state.robot)
    const dispatch = useAppDispatch();

    const title = currentInstance.bid === ""
        ? "选择一个对话或创建新的机器人"
        : currentInstance.name;
    const {token} = currentInstance;

    // form
    const [selectedIndex, changeIndex] = useState<number>(0)
    const [instanceName, setName] = useState<string>("")

    const createInstance = useCallback(async () => {
        const bid = schema[selectedIndex].bid
        const {instance_token: token} = await addInstanceApi(bid);
        if (token) {
            dispatch(addInstance({token, bid, name: instanceName, messages: []}))
            toast("创建成功");
        } else {
            console.error("Get empty token");
        }
    }, [dispatch, instanceName, schema, selectedIndex])

    useEffect(() => {
        if (token !== "") {
            const url = `ws://localhost:8000/talk/${token}`
            const socket = new WebSocket(url);
            socket.onmessage = (event) => {
                dispatch(addMessage({messageText: event.data, sender: "others"}));
            }
            dispatch(setSocket(socket))
        }
        return () => {
            dispatch(closeSocket());
        };
    }, [token, dispatch])
    return (
        <>
            <div className="d-flex">
                <SideBar/>
                <div className="d-flex w-100">
                    <div className="col">
                        <div className="border-bottom d-flex justify-content-start align-items-center"
                             style={{height: "3.5rem"}}>
                            <h2 className="mb-0">{`「${title}」`}</h2>
                            <p className="mb-0">{token && `#${token}`}</p>
                        </div>
                        <MessageContainer/>
                        <div className="position-absolute bottom-0" style={{left: "0%", right: "10%"}}>
                            <MessageInput disabled={!currentInstance.bid}/>
                        </div>
                    </div>
                    <div className="col-2 border-start">
                        <RightBar/>
                    </div>
                </div>
            </div>
            <Modal id={"addConversation"}
                   headerLabel={"添加机器人"}
                   bodyComponent={
                       <>
                           <p>选择机器人实例：</p>
                           <select className="form-select"
                                   onChange={(event) => changeIndex(Number(event.target.value))}>
                               {schema.map((robot, index) => <option key={index} value={index}>{robot.name}</option>)}
                           </select>
                           <p className="pt-2">名称：</p>
                           <input className="form-control" onChange={(event) => {
                               setName(event.target.value);
                           }}/>
                       </>
                   }
                   footerComponent={
                       <>
                           <button className="btn btn-success" data-bs-dismiss="modal" onClick={() => {
                               createInstance().then();
                           }}>创建
                           </button>
                           <button className="btn btn-secondary" data-bs-dismiss="modal">取消
                           </button>
                       </>
                   }
            />
        </>
    )
}

export default Chat;
