from module.base import deep_get
from module.logger import logger
from .utils import check_key_existence, KeyNotFoundError


class Action:
    def __init__(self, action: dict):
        self.reply = deep_get(action, 'reply')
        self.switch = deep_get(action, 'switch')
        if self.reply is None and self.switch is None:
            logger.warning(f"Empty action from {action}")
            raise Exception


class Scenario:
    def __init__(self, scenario: dict):
        self.triggers = deep_get(scenario, 'triggers')
        self.action = deep_get(scenario, 'action')
        check_key_existence(self, 'scenario', ['action', 'triggers'])
        self.action = Action(self.action)


class State:
    def __init__(self, state: dict):
        self.name = deep_get(state, 'name')
        self.scenarios = deep_get(state, 'scenarios')
        self.default = deep_get(state, 'default')
        check_key_existence(self, 'state', ['name', 'scenarios', 'default'])

        self.scenarios = [Scenario(scenario) for scenario in self.scenarios]


class Chatbot:
    def __init__(self, script: dict):
        self.name = deep_get(script, 'name')
        self.description = deep_get(script, 'description')
        self.states = deep_get(script, 'states')
        self.initial_state_name = deep_get(script, 'initial')
        self.opening = deep_get(script, 'opening')
        check_key_existence(self, 'Chatbot', ['name', 'description', 'states',
                                              'initial_state_name', 'opening'])
        self.states: dict[str, State] = {state['name']: State(state) for state in self.states}
        self.current_state = None
        self.switch_state(self.initial_state_name)

    def switch_state(self, state_name):
        if state_name not in self.states.keys():
            logger.warning(f"Initial state does not exist: {state_name}")
            raise KeyNotFoundError
        self.current_state = self.states[state_name]
        logger.info(f"Switch state to {state_name}")

    def take_input(self, input_: str):
        current_state = self.current_state  # make sure state does not change when search triggers
        matched = False
        matched_once = False
        for scenario in current_state.scenarios:
            for trigger in scenario.triggers:
                if trigger in input_:
                    logger.info(f"Matched scenario with word: {trigger}")
                    if scenario.action.switch:
                        self.switch_state(scenario.action.switch)
                    if scenario.action.reply:
                        yield scenario.action.reply
                    matched_once = True
                    matched = True
                    break
            if matched:
                matched = False
                continue

        if not matched_once:
            logger.warning("Does not match any words, use default reply")
            yield current_state.default
