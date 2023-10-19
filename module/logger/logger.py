"""
日志模块

日志会在命令行中输出，同时保存到项目根目录 log/ 文件夹下

可以使用以下几个级别的 log:
    1. info: 用于告知程序运行到哪个阶段
    2. warning: 用于警告发生了某些不应该发生的事情
    3. critical: 出现致命错误

在其他文件中导入 from logger import *
然后使用 logger.info/warning/critical() 即可打印日志。
只需要输入消息，打印时间，打印位置等信息会自动补上。
当然，如果是前端的 time，则需要手动补上。

"""

import os
import logging
import datetime
import sys

from rich.highlighter import NullHighlighter
from rich.console import Console
from rich.logging import RichHandler

logger = logging.getLogger('dev')

logger.setLevel(logging.INFO)

console_handler = RichHandler(
    show_path=True,
    show_time=False,
    rich_tracebacks=True,
    tracebacks_show_locals=True,
    tracebacks_extra_lines=3,
)

# Ensure running in Alas root folder
os.chdir(os.path.join(os.path.dirname(__file__), '../../'))

# Add file logger
pyw_name = os.path.splitext(os.path.basename(sys.argv[0]))[0]


def set_file_logger():
    log_file = f'./log/{datetime.date.today()}.txt'
    try:
        file = open(log_file, mode='a', encoding='utf-8')
    except FileNotFoundError:
        os.mkdir('./log')
        file = open(log_file, mode='w', encoding='utf-8')

    file_console = Console(
        file=file,
        no_color=True,
        highlight=False,
        width=119,
    )

    handler = RichHandler(
        console=file_console,
        show_path=True,
        show_time=False,
        show_level=True,
        rich_tracebacks=True,
        tracebacks_show_locals=True,
        tracebacks_extra_lines=3,
        highlighter=NullHighlighter(),
    )

    logger.addHandler(handler)
    logger.log_file = log_file


logger.addHandler(console_handler)
set_file_logger()
