import request from '/src/api/request.ts'
import {Robot} from "/src/api/types.ts";
import {apiRoot} from "/src/config.json"

export async function listRobotSchema(): Promise<{ robots: Robot[] }> {
    console.log("API Called: listRobotSchema");
    const {data} = await request.get(`${apiRoot}/list`);
    console.log("Result of listRobotSchema: ", data);
    return data;
}

export async function addInstanceApi(bid: string): Promise<{ instance_token: string }> {
    console.log("API Called: addInstance");
    const {data} = await request.get(`${apiRoot}/create-instance`, {params: {bid}});
    console.log("Result of addInstance: ", data);
    return data;
}

