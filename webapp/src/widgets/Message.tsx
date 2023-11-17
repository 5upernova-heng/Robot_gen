import STYLE, {UserType} from "/src/style.js";
import Avatar from "/src/widgets/Avatar.jsx";
import Time from "/src/widgets/Time.jsx";

type Props = {
    message: string,
    name: string
    time: string,
    role: UserType
}

function Message({message, time, name, role}: Props) {
    return (
        <div className={`d-flex align-items-start justify-content-start ${STYLE.messageAlignStyle[role]} mx-3 gap-3`}>
            <Avatar name={name}/>
            <div
                className={`d-flex flex-column flex-grow-1 ${role === "user" ? "align-items-end" : "align-items-start"} `}>
                <div className={`d-flex align-items-center ${STYLE.messageAlignStyle[role]} gap-3`}>
                    <h5 className="fw-bold">{name}</h5>
                    <Time timeStr={time}/>
                </div>
                <div
                    className={`rounded-3 shadow ${STYLE.roleBackgroundStyle[role]}`}
                    style={{
                        maxWidth: "50%",
                        padding: "0.7rem"
                    }}>
                    <p className={`mb-0 ${STYLE.textColorStyle[role]}`}
                       style={{
                           whiteSpace: "pre-line",
                           wordBreak: "break-all",
                           fontSize: "1.2rem"
                       }}>{message}</p>
                </div>
            </div>
        </div>
    )
}


export default Message;
