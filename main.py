from fastapi import FastAPI, WebSocket, WebSocketDisconnect

from module.base import SocketManager, RobotManager
from module.logger import logger

app = FastAPI()
socket_manager = SocketManager()
robot_manager = RobotManager()


@app.get("/list")
async def list_robots():
    return {'robots': list(robot_manager.list_schemas())}


@app.get("/create-instance")
async def create_instance(bid):
    return {'instance_token': robot_manager.create_robot_instance(bid)}


@app.websocket("/talk/{token}")
async def talk(websocket: WebSocket, token: str):
    await socket_manager.connect(websocket)
    if not robot_manager.check_token(token):
        logger.warning("Invalid token, close socket immediately")
        socket_manager.disconnect(websocket)
        await websocket.close()
        return
    try:
        while True:
            data = await websocket.receive_text()
            replies = robot_manager.talk(token, input_=data)
            for reply in replies:
                await socket_manager.send_personal_message(reply, websocket)
    except WebSocketDisconnect:
        socket_manager.disconnect(websocket)
