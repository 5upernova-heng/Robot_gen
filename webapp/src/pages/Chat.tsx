import {Group} from "/src/api/types.ts";
import {useAppSelector} from "/src/app/hooks.ts";
import RightBar from "/src/components/RightBar.jsx";
import SideBar from "/src/components/SideBar.jsx";
import MessageContainer from "/src/features/chat/MessageContainer.tsx";
import MessageInput from "/src/features/chat/MessageInput.tsx";
import Style from "/src/style.ts";


function Chat() {
    const {mode, currentChat} = useAppSelector(state => ({...state.view,}))
    const title = currentChat.id === -1
        ? "选择一个对话或创建新的机器人"
        : currentChat.entity.name;
    const label = currentChat.id === -1
        ? ""
        : (mode ? `${Style.groupLevelLabel[(currentChat.entity as Group).level]} 级群聊`
            : "私聊")

    return (
        <>
            <div className="d-flex">
                <SideBar/>
                <div className="d-flex w-100">
                    <div className="col">
                        <div className="border-bottom d-flex justify-content-between align-items-center"
                             style={{height: "3.5rem"}}>
                            <h2 className="mb-0">{`「${title}」`}</h2>
                            <h2 className="mb-0 pe-3">{label}</h2>
                        </div>
                        <MessageContainer/>
                        <div className="position-absolute bottom-0" style={{left: "0%", right: "10%"}}>
                            <MessageInput disabled={currentChat.id === -1}/>
                        </div>
                    </div>
                    <div className="col-2 border-start">
                        <RightBar/>
                    </div>
                </div>
            </div>
            {/*<Modal id={"addConversation"}*/}
            {/*       headerLabel={"添加好友 / 群聊"}*/}
            {/*       bodyComponent={*/}
            {/*           <AddConversation newGroup={newGroup} setNewGroup={setNewGroup}/>*/}
            {/*       }*/}
            {/*       footerComponent={*/}
            {/*           <>*/}
            {/*               {tab < 2 ||*/}
            {/*                   <button className="btn btn-success"*/}
            {/*                           data-bs-dismiss="modal"*/}
            {/*                           onClick={() => dispatch(createNewGroup(newGroup))}*/}
            {/*                   >添加</button>*/}
            {/*               }*/}
            {/*               <button className="btn btn-secondary" data-bs-dismiss="modal">取消*/}
            {/*               </button>*/}
            {/*           </>*/}
            {/*       }*/}
            {/*/>*/}
        </>
    )
}

export default Chat;
