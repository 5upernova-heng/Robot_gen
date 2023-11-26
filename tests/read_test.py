from module.base.robot_manager import RobotManager


def test_read():
    robot_manager = RobotManager()
    robot_manager.load_schemas()
    schema_names = [schema['name'] for schema in robot_manager.robot_schemas.values()]
    assert schema_names == ['助教机器人', '销售机器人', 'demo robot']
