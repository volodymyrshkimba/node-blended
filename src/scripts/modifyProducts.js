import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

const modifyProducts = async () => {
  try {
    const data = await fs.readFile(PATH_DB, "utf-8");
    const currentProducts = JSON.parse(data);
    const modifiedProducts = currentProducts.map(
      ({ description, ...product }) => {
        return product;
      }
    );
    await fs.writeFile(PATH_DB, JSON.stringify(modifiedProducts, null, 2));
  } catch (error) {
    console.log(error);
  }
};

modifyProducts();
