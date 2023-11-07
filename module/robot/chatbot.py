from typing import List, Generator
from module.logger import logger
import numpy as np


class Scenario:
    def __init__(self, scenario: dict):
        self.name = scenario['name']
        self.triggers = [trigger.lower() for trigger in scenario['triggers']]
        self.responses = scenario['responses']


class Chatbot:
    def __init__(self, script: dict):
        self.scenarios = [Scenario(text) for text in script['scenarios']]

    def try_trigger(self, input: str) -> Generator[str]:
        """
        :param input: 用户输入的语句
        :return: 触发的语句所构成的生成器。（因为可能触发多个语句）
        """
        words = input.split()
        for word in words:
            for scenario in self.scenarios:
                if word.lower() in scenario.triggers:
                    logger.info(f"Matched scenario: {scenario.name} with word {word}")
                    yield np.random.choice(scenario.responses)
