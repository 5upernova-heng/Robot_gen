from module.parser import parse
from module.robot import Chatbot

scripts = """
name: test
description: 用户输入测试
initial: state_a
states:
  - name: state_a
    scenarios:
      - triggers:
          - trigger1
          - trigger2
        action:
          reply:
            reply1
      - triggers:
          - trigger3
        action:
          reply:
            reply2
"""

obj = parse(scripts)
test = Chatbot(obj)


def test_empty():
    assert list(test.take_input("")) == []  # 空串不触发任何回复


def test_correct():
    assert list(test.take_input("trigger1")) == ['reply1']  # 等于 trigger 的触发回复
    assert list(test.take_input("trigger2")) == ['reply1']


def test_duplicate_trigger():
    assert list(test.take_input("trigger1 trigger1")) == ['reply1']  # 同一个 trigger 只触发一次
    assert list(test.take_input("trigger1 trigger2")) == ['reply1']  # 同一个 trigger 只触发一次


def test_multiple_trigger():
    assert list(test.take_input("trigger1 trigger3")) == ['reply1', 'reply2']
    assert list(test.take_input("trigger1 trigger2 trigger3")) == ['reply1', 'reply2']
