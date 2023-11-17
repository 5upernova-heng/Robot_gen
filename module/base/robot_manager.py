"""
用于管理服务器中的各个机器人
单例。
"""
import hashlib
import os
from typing import List

from yaml import YAMLError

from module.logger import logger
from module.parser import parse
from module.robot import Chatbot
from .utils import deep_get


def sha1hex(text: str):
    return hashlib.sha1(text.encode('utf-8')).hexdigest()


class RobotManager:
    robot_schemas: dict[str, dict] = {}
    robot_instances: dict[str, Chatbot] = {}

    def __init__(self, scripts_path="./scripts"):
        self.scripts_path = scripts_path
        self.load_schemas()

    def list_schemas(self):
        for key, value in self.robot_schemas.items():
            yield {
                'bid': key,
                'name': value['name'],
                'description': value['description'],
            }

    def load_schemas(self):
        logger.info(f"load schemas from {self.scripts_path}")
        for filename in os.listdir(self.scripts_path):
            if filename.split('.')[-1] != 'yaml':
                continue
            with open(f"{self.scripts_path}/{filename}", 'r', encoding='utf-8') as f:
                script_text = f.read()
            self.create_robot_schema(script_text)
            logger.info(f"{filename} loaded as schema")

    def create_robot_schema(self, script: str, name: str = ""):
        try:
            dict_ = parse(script)
            if name == "":
                name = deep_get(dict_, ['name'])
            hash_ = sha1hex(name + script)
            self.robot_schemas[hash_] = dict_
            logger.info(f"Schema {name} created, sha1: {hash_}")
            return hash_
        except YAMLError as e:
            logger.warning("Can not parse script correctly")
            logger.warning(e)
            return ""

    def create_robot_instance(self, sha1_value: str) -> str:
        if sha1_value not in self.robot_schemas.keys():
            logger.warning(f"Can not find robot schema with sha1 value {sha1_value}")
            return ""
        schema = self.robot_schemas[sha1_value]
        robot = Chatbot(schema)
        hash_ = str(hash(robot))
        self.robot_instances[hash_] = robot
        logger.info(f"Robot instance {hash_} created")
        return hash_

    def check_token(self, robot_hash) -> bool:
        if robot_hash not in self.robot_instances.keys():
            logger.warning(f"Can not find robot instance with hash value {robot_hash}")
            return False
        return True

    def talk(self, robot_hash, input_: str) -> List[str]:
        logger.warning(f"User: '{input_}' -> {robot_hash}")
        robot = self.robot_instances[robot_hash]
        replies = [action for action in robot.take_input(input_)]
        if replies:
            logger.info(f"Reply from {robot_hash}: {replies}")
        else:
            logger.warning("Get no reply, probably does not trigger any words")
        return replies
