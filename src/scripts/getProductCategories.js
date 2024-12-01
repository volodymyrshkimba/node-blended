import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

const getProductCategories = async () => {
  try {
    const data = await fs.readFile(PATH_DB, "utf-8");
    const currentProducts = JSON.parse(data);
    const productCategories = currentProducts
      .map(({ category }) => category)
      .filter((item, idx, arr) => {
        return arr.indexOf(item) === idx;
      });

    console.log(productCategories);
  } catch (error) {
    console.log(error);
  }
};

getProductCategories();
