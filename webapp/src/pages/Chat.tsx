import {addInstanceApi} from "/src/api/robotApi.ts";
import {useAppDispatch, useAppSelector} from "/src/app/hooks.ts";
import SideBar from "/src/components/SideBar.jsx";
import MessageContainer from "/src/features/chat/MessageContainer.tsx";
import MessageInput from "/src/features/chat/MessageInput.tsx";
import {addInstance, addMessage, closeSocket, setSocket, switchInstance} from '/src/features/robotSlice.ts'
import Modal from '/src/widgets/Modal.tsx'
import {useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";


function Chat() {
    const {currentInstance, instances} = useAppSelector(state => ({...state.robot,}))
    const {schema} = useAppSelector(state => state.robot)
    const dispatch = useAppDispatch();

    const instance = instances.find((i) => i.token === currentInstance);

    const title = currentInstance === ""
        ? "选择一个对话或创建新的机器人"
        : instance?.name;

    // form
    const [selectedIndex, changeIndex] = useState<number>(0)
    const [instanceName, setName] = useState<string>("")

    const createInstance = useCallback(async () => {
        const bid = schema[selectedIndex].bid
        const {instance_token: token} = await addInstanceApi(bid);
        if (token) {
            dispatch(addInstance({token, bid, name: instanceName, messages: []}))
            toast("创建成功");
            dispatch(switchInstance(token))
        } else {
            console.error("Get empty token");
        }
    }, [dispatch, instanceName, schema, selectedIndex])

    useEffect(() => {
        if (currentInstance !== "") {
            const url = `ws://localhost:8000/talk/${currentInstance}`
            const socket = new WebSocket(url);
            socket.onmessage = (event) => {
                dispatch(addMessage({messageText: event.data, sender: "others"}));
            }
            dispatch(setSocket(socket))
        }
        return () => {
            dispatch(closeSocket());
        };
    }, [currentInstance, dispatch])

    return (
        <>
            <div className="d-flex" style={{background: "#e3e5e8"}}>
                <SideBar/>
                <div className="position-absolute d-flex" style={{left: "4.5rem", right: "0%"}}>
                    <div
                        className="position-fixed
                            z-1 border-bottom border-bottom w-100
                            d-flex  justify-content-start align-items-center"
                        style={{height: "3.5rem", background: "#e3e5e8"}}>
                        <h2 className="mb-0">{`「${title}」`}</h2>
                        <p className="mb-0">{currentInstance && `#${currentInstance}`}</p>
                    </div>

                    <div className="w-100 overflow-auto" style={{height: "calc(100vh-10.5rem)"}}>
                        <div style={{height: "3.5rem"}}></div>
                        <MessageContainer/>
                        <div style={{height: "9rem"}}></div>
                    </div>
                    <div className="position-fixed bottom-0"
                         style={{left: "4.5rem", right: "0%", backdropFilter: "blur(10px)"}}>
                        <MessageInput disabled={!instance?.bid}/>
                    </div>
                    {/*<div className="col-2 border-start">*/}
                    {/*    <RightBar/>*/}
                    {/*</div>*/}
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
