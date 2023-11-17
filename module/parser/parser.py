from typing import Optional

import yaml

from module.logger import logger


def syntax_check(script: str) -> Optional[dict]:
    try:
        robot = yaml.load(script, yaml.FullLoader)
    except yaml.YAMLError as e:
        logger.warning(e)
        return None
    return robot


def parse(script: str) -> Optional[dict]:
    """
    :param script: user script that use to generate the robot
    :return: Robot defined by the script
    """
    robot = syntax_check(script)
    if robot is None:
        return None
    logger.info("Parse script file succeed")
    return robot
