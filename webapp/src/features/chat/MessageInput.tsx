import {useAppDispatch, useAppSelector} from "/src/app/hooks.ts";
import {addMessage} from "/src/features/robotSlice.ts";
import "/src/styles/MessageInput.css"
import {useState} from "react";

type Props = { disabled: boolean }

function MessageInput({disabled}: Props) {
    const [message, setMessage] = useState("");

    const {socket} = useAppSelector(state => state.robot)
    const dispatch = useAppDispatch()

    const handleSubmit = async () => {
        socket?.send(message);
        dispatch(addMessage({messageText: message, sender: 'user'}))
    }

    return (
        <div className="d-flex justify-content-center align-items-start gap-3"
             style={{
                 height: "7rem"
             }}
        >
            <div style={{width: "50%"}}>
                <textarea className="message-input" autoFocus={true}
                          value={message}
                          onChange={(event) => setMessage(event.target.value)}
                />
            </div>
            <button disabled={disabled} className="btn btn-lg rounded-3 btn-primary shadow"
                    onClick={() => {
                        handleSubmit().then()
                    }}
            >发送
            </button>
        </div>
    )
}


export default MessageInput;
