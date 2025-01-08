# MultipleBot

一个用于Multiple App的自动登录机器人，维持在线状态。

## 功能

- 使用JWT令牌自动登录
- 支持多账户
- 以DD:HH:MM格式跟踪运行时间
- 自动状态检查
- 彩色控制台输出
- 美观的CLI横幅

## 先决条件

- Node.js（版本14或更高）
- NPM（Node包管理器）
- Multiple App账户（如果没有，可以在[Multiple App](https://www.app.multiple.cc/#/signup?inviteCode=4pe17iNY)注册）

## 安装

1. 克隆本仓库：

```bash
git clone https://github.com/huaguihai/MultipleBOT.git
```

2. 进入项目目录：

```bash
cd MultipleBOT
```

3. 安装依赖：

```bash
npm install
```

## 如何获取JWT令牌

1. 访问[Multiple App仪表板](https://www.app.multiple.cc)
2. 右键点击扩展图标
3. 选择"检查弹出窗口"
4. 在开发者工具中：
   - 转到"网络"标签
   - 在扩展中执行登录
   - 查找"Login"端点
   - 在请求头中找到JWT令牌
   - 复制JWT令牌（以"Bearer"开头）

## 配置

1. 编辑`data.txt`文件
2. 将您的JWT令牌添加到`data.txt`：
   - 每个令牌占一行，支持多账户
   - 示例：
     ```
     eyJhbG...token1...
     eyJhbG...token2...
     eyJhbG...token3...
     ```

## 使用

运行机器人：

```bash
node main.js
```

机器人将：

- 从data.txt加载JWT令牌
- 自动为每个账户登录
- 监控在线状态
- 显示每个账户的运行时间
- 如果连接丢失则自动重连

## 联系方式

- GitHub: [https://github.com/huaguihai/MultipleBOT](https://github.com/huaguihai/MultipleBOT)

## 重要说明

- 请妥善保管您的JWT令牌，切勿分享
- 机器人默认每分钟检查一次状态
- 每个账户的状态独立跟踪
- 时间以DD:HH:MM格式显示
- 控制台输出采用彩色编码，便于阅读

## 许可证

本项目采用MIT许可证 - 详见LICENSE文件。
