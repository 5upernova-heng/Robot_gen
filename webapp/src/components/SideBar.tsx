import {useAppDispatch, useAppSelector} from "/src/app/hooks.ts";
import {fetchSchemas} from "/src/features/robotSlice.ts";
import {switchInstance} from "/src/features/viewSlice.ts";
import Avatar from "/src/widgets/Avatar.jsx";
import {Modal} from "bootstrap"

function SideBar() {
    Modal;
    const dispatch = useAppDispatch()
    const {instances} = useAppSelector(state => state.robot)
    return (<div className="d-flex flex-column align-items-center gap-3 pt-2 p-2"
                 style={{height: "100vh", backgroundColor: "#e3e5e8"}}
    >
        {instances.map((instance) => <div onClick={() => dispatch(switchInstance(instance))}>
                <Avatar name={instance.name}/>
            </div>
        )}
        <div
            data-bs-toggle="modal"
            data-bs-target={"#addConversation"}
            onClick={() => {
                dispatch(fetchSchemas());
            }}
        >
            <Avatar name="+" color="#3b3b3b" textColor="#ffffff"/>
        </div>
    </div>)
}

export default SideBar;
