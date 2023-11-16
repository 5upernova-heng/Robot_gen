import Message from "/src/widgets/Message.tsx";

function MessageContainer() {

    return (
        <div className="d-flex flex-column gap-3 py-3">
            <Message message={"test"} user={{id: 1, name: "test"}} time={"1970-01-01 00:00:00"} role={'others'}/>
        </div>
    );
}

export default MessageContainer;
