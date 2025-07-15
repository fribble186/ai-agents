import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import "dotenv/config";

const shelf_life_url = process.env.SHELF_LIFE_SERVER;
const tag_api = `${shelf_life_url}/tags`;
const thing_api = (tag) => `${shelf_life_url}/things?tag=${tag ?? ""}`;

export default () => {
  const server = new McpServer({
    name: "shelflife-mcp-server",
    version: "1.0.0",
  });

  server.registerTool(
    "list-expiring-items",
    {
      title: "list expiring items",
      description: "list all expiring items",
      inputSchema: {},
    },
    async () => {
      const tagRes = await fetch(tag_api);
      const tags = await tagRes.json();
      for (let tag of tags) {
        const thingRes = await fetch(thing_api(tag.name));
        const things = await thingRes.json();
        tag["things"] = things.map((thing) => ({
          name: thing.name,
          expireAt: thing.expireAt,
        }));
      }
      return {
        content: [{ type: "text", text: JSON.stringify(tags) }],
      };
    }
  );

  return server;
};
