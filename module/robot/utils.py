class KeyNotFoundError(Exception):
    ...


def check_key_existence(obj: object, obj_name, key_names):
    if type(key_names) == str:
        key_names = [key_names]
    for key_name in key_names:
        if getattr(obj, key_name) is None:
            prompt = f"{obj_name} must have key {key_name}"
            raise KeyNotFoundError(prompt)
