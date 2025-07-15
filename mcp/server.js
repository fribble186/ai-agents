import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import mcpServer from "./mcpServer.js";

const app = express();
const transportMap = new Map();

const server = mcpServer();
// 用于 SSE 建立长连接
app.get("/sse", async (req, res) => {
  const transport = new SSEServerTransport("/messages", res);

  res.on("close", () => {
    console.log("SSE 连接已关闭");
  });
  transportMap.set(transport.sessionId, transport);
  await server.connect(transport);
});

// 用于发送客户端消息（如调用工具、请求资源）
app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId;
  const transport = transportMap.get(sessionId);

  if (!transport) {
    res.status(400).send("未找到对应的 SSE 会话");
    return;
  }

  await transport.handlePostMessage(req, res, req.body);
});

app.listen(3003, () => {
  console.log("✅ MCP SSE Server 已启动，监听端口 3003");
});
