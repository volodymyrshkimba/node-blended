import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

const getProductsByMinPrice = async (minPrice) => {
  try {
    const data = await fs.readFile(PATH_DB, "utf-8");
    const currentProducts = JSON.parse(data);
    const filteredProducts = currentProducts.filter(
      ({ price }) => price >= minPrice
    );
    console.log(filteredProducts);
  } catch (error) {
    console.log(error);
  }
};

getProductsByMinPrice(300);
