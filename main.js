// 导入所需模块
const fs = require("fs");
const axios = require("axios");
const displayBanner = require("./config/banner");
const colors = require("./config/colors");
const logger = require("./config/logger");

// 账户类
class Account {
  constructor(loginToken, index) {
    this.loginToken = loginToken;  // 登录令牌
    this.sessionToken = "";  // 会话令牌
    this.accountIndex = index;  // 账户索引
  }

  // 格式化运行时间
  formatRunningTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);

    return `${String(days).padStart(2, "0")}:${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}`;
  }

  // 登录方法
  async login() {
    try {
      logger.info(
        `${colors.info}Account ${colors.accountName}${this.accountIndex}${colors.info} > 正在尝试登录...${colors.reset}`
      );

      const loginResponse = await axios.post(
        `https://api.app.multiple.cc/ChromePlugin/Login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.loginToken}`,
            Accept: "application/json",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "en-US;q=0.9",
            "Content-Type": "application/json",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          },
        }
      );

      if (loginResponse.data.success && loginResponse.data.data.token) {
        this.sessionToken = loginResponse.data.data.token;
        logger.success(
          `${colors.success}Account ${colors.accountName}${this.accountIndex}${colors.success} > 获取到新的会话令牌${colors.reset}`
        );
        return true;
      }

      logger.warn(
        `${colors.warning}Account ${colors.accountName}${this.accountIndex}${colors.warning} > 响应中未找到会话令牌${colors.reset}`
      );
      return false;
    } catch (error) {
      logger.error(
        `${colors.error}Account ${colors.accountName}${this.accountIndex}${colors.error} > 登录错误: ${error.message}${colors.reset}`
      );
      return false;
    }
  }

  // 检查登录状态
  async checkLoginStatus() {
    try {
      const response = await axios.get(
        `https://api.app.multiple.cc/ChromePlugin/GetInformation`,
        {
          headers: {
            Authorization: `Bearer ${this.sessionToken}`,
            Accept: "application/json",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "en-US;q=0.9",
            "Content-Type": "application/json",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          },
        }
      );

      if (response.data.success && response.data.data.isOnline) {
        const formattedTime = this.formatRunningTime(
          response.data.data.totalRunningTime
        );
        logger.success(
          `${colors.success}Account ${colors.accountName}${this.accountIndex}${colors.success} > 状态: 在线 ${colors.timerCount}(运行时间: ${formattedTime})${colors.reset}`
        );
        return true;
      }
      logger.warn(
        `${colors.warning}Account ${colors.accountName}${this.accountIndex}${colors.warning} > 状态: 离线${colors.reset}`
      );
      return false;
    } catch (error) {
      logger.error(
        `${colors.error}Account ${colors.accountName}${this.accountIndex}${colors.error} > 状态检查错误: ${error.message}${colors.reset}`
      );
      return false;
    }
  }

  // 启动账户监控
  async start() {
    const initialLogin = await this.login();
    if (!initialLogin) {
      logger.error(
        `${colors.error}Account ${colors.accountName}${this.accountIndex}${colors.error} > 初始登录失败${colors.reset}`
      );
      return;
    }

    // 设置定时器，每分钟检查一次状态
    setInterval(async () => {
      const isLoggedIn = await this.checkLoginStatus();

      if (!isLoggedIn) {
        logger.warn(
          `${colors.warning}Account ${colors.accountName}${this.accountIndex}${colors.warning} > 状态离线，正在尝试重新登录...${colors.reset}`
        );
        const loginSuccess = await this.login();
        if (loginSuccess) {
          logger.success(
            `${colors.success}Account ${colors.accountName}${this.accountIndex}${colors.success} > 登录成功${colors.reset}`
          );
          await this.checkLoginStatus();
        } else {
          logger.error(
            `${colors.error}Account ${colors.accountName}${this.accountIndex}${colors.error} > 登录失败${colors.reset}`
          );
        }
      }
    }, 60000);
  }
}

// 自动登录类
class AutoLogin {
  constructor() {
    this.tokenFile = "data.txt";  // 令牌文件
    this.accounts = [];  // 账户列表
  }

  // 加载账户
  async loadAccounts() {
    try {
      const fileContent = await fs.promises.readFile(this.tokenFile, "utf8");
      const tokens = fileContent.split("\n").filter((token) => token.trim());

      logger.info(
        `${colors.info}在 data.txt 中找到 ${colors.custom}${tokens.length}${colors.info} 个账户${colors.reset}`
      );

      tokens.forEach((token, index) => {
        this.accounts.push(new Account(token.trim(), index + 1));
      });

      return true;
    } catch (error) {
      logger.error(
        `${colors.error}读取令牌错误: ${error.message}${colors.reset}`
      );
      return false;
    }
  }

  // 启动自动登录
  async start() {
    displayBanner();
    logger.info(
      `${colors.info}正在启动多账户自动登录...${colors.reset}`
    );

    const accountsLoaded = await this.loadAccounts();
    if (!accountsLoaded || this.accounts.length === 0) {
      logger.error(
        `${colors.error}data.txt 中未找到账户${colors.reset}`
      );
      return;
    }

    this.accounts.forEach((account) => {
      account.start();
    });
  }
}

// 启动自动登录
const autoLogin = new AutoLogin();
autoLogin.start().catch((error) => {
  logger.error(`${colors.error}系统错误: ${error.message}${colors.reset}`);
});
