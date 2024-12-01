import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";
import { createFakeProduct } from "../utils/createFakeProduct.js";

const generateProducts = async (number) => {
  try {
    const data = await fs.readFile(PATH_DB, "utf-8");
    const currentProducts = JSON.parse(data);
    for (let i = 0; i < number; i++) {
      currentProducts.push(createFakeProduct());
    }
    await fs.writeFile(PATH_DB, JSON.stringify(currentProducts, null, 2));
  } catch (error) {
    console.log(error);
  }
};

generateProducts(3);
