import {useAppSelector} from "/src/app/hooks.ts";
import Message from "/src/widgets/Message.tsx";

function MessageContainer() {
    const {currentInstance} = useAppSelector(state => state.view)

    return (
        <div className="d-flex flex-column gap-3 py-3">
            {currentInstance.messages.map((message) => {
                return <Message
                    message={message.messageText}
                    name={message.sender === "user" ? "user" : currentInstance.name}
                    time={message.messageTime}
                    role={message.sender}/>
            })}
        </div>
    );
}

export default MessageContainer;
