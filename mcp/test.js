import "dotenv/config";

const shelf_life_url = process.env.SHELF_LIFE_SERVER;
const tag_api = `${shelf_life_url}/tags`;
const thing_api = (tag) => `${shelf_life_url}/things?tag=${tag ?? ""}`;

const main = async () => {
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
  console.log(JSON.stringify(tags));
};

main();
