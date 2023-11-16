import Avatar from "/src/widgets/Avatar.jsx";
import {Modal} from "bootstrap"

function SideBar() {
    Modal;
    return (<div className="d-flex flex-column align-items-center gap-3 pt-2 p-2"
                 style={{height: "100vh", backgroundColor: "#e3e5e8"}}
    >
        <div
            data-bs-toggle="modal"
            data-bs-target={"#addConversation"}
        >
            <Avatar name="+" color="#3b3b3b" textColor="#ffffff"/>
        </div>
    </div>)
}

export default SideBar;
