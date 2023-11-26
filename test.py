from module.logger import logger
from module.parser import parse
from module.robot import Chatbot


def get_input() -> str: ...


if __name__ == '__main__':
    with open("scripts/test.yaml", 'r', encoding='utf-8') as test:
        chatbot = parse(test.read())
    logger.info("Robot generated")
    chatbot = Chatbot(chatbot)
    while 1:
        input_ = input("[User]: ")
        replies = [action for action in chatbot.take_input(input_)]
        for reply in replies:
            print(f"[Robot]: {reply}")
