const { json } = require("stream/consumers");
const countries = require("./countries.json");
const fs = require("fs").promises;

async function sleep(milliseconds) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

(async () => {
  for (const country of countries) {
    try {
      const service = await fetch(
        `https://5sim.net/v1/guest/products/${country.id}/any`,
      );
      const data = await service.json();
      const products = Object.entries(data).map((value) => value[0]);
      const file = await fs.writeFile(
        `services/service-${country.id}.json`,
        JSON.stringify(products),
      );
      console.log(`service-${country.id}.json created`);
      await sleep(1000);
    } catch (error) {
      console.error(`Error fetching data for ${country.id}`);
    }
  }
})();
