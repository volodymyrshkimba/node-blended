import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

const showProductsByCategories = async () => {
  const data = await fs.readFile(PATH_DB, "utf-8");
  const currentProducts = JSON.parse(data);
  const productCategories = currentProducts
    .map(({ category }) => category)
    .filter((item, idx, arr) => {
      return arr.indexOf(item) === idx;
    });

  const productsByCategories = productCategories.reduce((acc, category) => {
    acc[category] = currentProducts.filter(
      (product) => product.category === category
    );

    return acc;
  }, {});

  console.log(productsByCategories);
};

showProductsByCategories();
