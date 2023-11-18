import {useAppSelector} from "/src/app/hooks.ts";
import Message from "/src/widgets/Message.tsx";
import {useEffect} from "react";

function MessageContainer() {
    const {currentInstance, instances} = useAppSelector(state => state.robot)
    const instance = instances.find((i) => i.token === currentInstance)

    useEffect(() => {
        const scroll = document.scrollingElement || document.body
        scroll.scrollTo(0, scroll.scrollHeight)
        console.log("T")
    }, [instance?.messages]);

    return (
        <div className="d-flex flex-column gap-3 py-3">
            {instance?.messages.map((message) => {
                return <Message
                    message={message.messageText}
                    name={message.sender === "user" ? "user" : instance.name}
                    time={message.messageTime}
                    role={message.sender}/>
            })}
        </div>
    );

}

export default MessageContainer;
