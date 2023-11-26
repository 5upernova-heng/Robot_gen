# Robot_gen

客服机器人生成器。

## 环境配置

### 1.安装 Python 环境

```bash
pip install -r requirements.txt
```

### 2.安装前端环境

```bash
cd webapp
yarn
```

### 3.启动

```bash
# 后端（项目根目录下运行）
uvicorn main:app

# 前端（webapp 目录下运行）
yarn dev
```

### 4.测试

单元测试：

```bash
pytest
```

集成测试（使用命令行直接与机器人交互）：

```bash
python test.py
```
