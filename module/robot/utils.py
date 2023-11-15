class KeyNotFoundError(Exception):
    ...


def deep_get(d, keys, default=None):
    """
    Get values in dictionary safely.
    https://stackoverflow.com/questions/25833613/safe-method-to-get-value-of-nested-dictionary

    Args:
        d (dict):
        keys (str, list): Such as `Scheduler.NextRun.value`
        default: Default return if key not found.

    Returns:

    """
    if isinstance(keys, str):
        keys = keys.split('.')
    assert type(keys) is list
    if d is None:
        return default
    if not keys:
        return d
    return deep_get(d.get(keys[0]), keys[1:], default)


def check_key_existence(obj: object, obj_name, key_names):
    if type(key_names) == str:
        key_names = [key_names]
    for key_name in key_names:
        if getattr(obj, key_name) is None:
            prompt = f"{obj_name} must have key {key_name}"
            raise KeyNotFoundError(prompt)
