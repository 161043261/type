# vue-vite

> [!tip]
> How I get '/genshin-data.json'

```ts
import GenshinData from "genshin-data";

const genshinData = new GenshinData();

// async/await
(async () => {
  const characters = await genshinData.characters();
  const all = {};
  characters.forEach((item) => (all[item.id] = item));
  fs.writeFile("../assets/genshin-data.json", JSON.stringify(all), (err) => {
    if (err) console.error(err);
  });
})();
```
