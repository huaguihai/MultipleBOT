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

### 如何获取JWT令牌

1. 访问[Multiple App仪表板](https://www.app.multiple.cc)。

2. 在浏览器中找到该扩展程序的图标，然后右键点击它。通常，浏览器扩展程序的图标位于浏览器的工具栏上。

3. 在右键菜单中选择“检查弹出窗口”选项。这将打开浏览器的开发者工具（DevTools），并定位到该扩展程序的弹出界面的代码。

4. 在开发者工具中，找到并切换到“网络”（Network）标签页。这个标签页用于监控网络请求和响应。

5. 在扩展程序中进行登录操作。这将触发一个网络请求，以便与服务器进行通信以验证你的身份。

6. 在“网络”标签页中，查找与登录相关的网络请求。通常，这个请求会标记为“Login”或类似的名称。

7. 在找到的登录请求的请求头（Headers）中，找到JWT令牌。JWT令牌通常位于请求头的“Authorization”字段中。

8. 复制JWT令牌。JWT令牌通常以“Bearer”开头，后面跟着一个空格和一串字符，这就是你的JWT令牌。


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
