# MCP server for ShelfLife

> ShelfLife 是一款记录生活中所有"有时间效期"的事物的轻量级应用 [ShelfLife github repo](https://github.com/fribble186/ShelfLife)

> mcp server ts 参考 [typescript-sdk github repo](https://github.com/modelcontextprotocol/typescript-sdk)

> 这个 mcp server 暂时只提供了一个 tool，列出自己部署的 ShelfLife 服务中所有的事物；本 mcp 只提供了 sse 形式

## .env

启动该 mcp server 需要自己创建一个 .env 文件
| key | 备注 |
| -- | -- |
| SHELF_LIFE_SERVER | 自己部署的 ShelfLife 服务的 uri (eg. https://service/api) |

## how to start

```shell
pnpm run server
```

## 开发 mcp 感受

mcp 作用和开发 workflow 当作 ai agent 的 function 是类似的，但是自己在 dify 或者 n8n 开发的 workflow 只能在系统内部调用使用，mcp 可以供其它所有 agent 使用。

就像一个后端 service 一样，而 llm，prompt 工程类似前端。
