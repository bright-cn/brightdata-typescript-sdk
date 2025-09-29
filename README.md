# Bright Data SDK

[![npm version](https://badge.fury.io/js/%40brightdata%2Fsdk.svg)](https://badge.fury.io/js/%40brightdata%2Fsdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Bright Data API 的官方 TypeScript/JavaScript SDK。目前支持 Web Unlocker API。

## 功能特性

- 🔓 Web Unlocker API —— 绕过反爬措施，访问任意网站
- 🛡️ 内置错误处理 —— 全面的错误处理与重试机制
- 📝 TypeScript 支持 —— 提供完整的 TypeScript 类型定义

## 安装

```bash
npm install @brightdata/sdk
```

## 快速开始
```Javascript 
import { BrightDataClient } from '@brightdata/sdk';

const client = new BrightDataClient('your-api-key', zone: 'web_unlocker1');

async function example() {
  try {
    const result = await client.webUnlocker.unlock('https://example.com');
    console.log(result.content);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

## Web Unlocker API 

```Javascript 

// 简单解锁请求
const result = await client.webUnlocker.unlock('https://example.com');

// 携带可选参数
const result = await client.webUnlocker.unlock('https://example.com', {
    country: 'US',
    format: 'raw',
    method: 'GET',
    data_format: 'markdown'
});
```

### 错误处理
```Javascript 

import { BrightDataError } from '@brightdata/sdk';

try {
  const result = await client.webUnlocker.unlock('https://example.com');
} catch (error) {
  if (error instanceof BrightDataError) {
    console.log('Status Code:', error.statusCode);
    console.log('Request ID:', error.requestId);
    console.log('Response:', error.response);
  }
}
```
