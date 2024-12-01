import path from "node:path";
import fs from "node:fs/promises";
import { PATH_DB, PATH_FILES_FOLDER } from "../constants/path.js";

const createProductFiles = async () => {
  try {
    const data = await fs.readFile(PATH_DB, "utf-8");
    const currentProducts = JSON.parse(data);
    currentProducts.forEach((product) => {
      const fileName = `${product.name
        .toLowerCase()
        .split(" ")
        .join("-")}.json`;
      const filePath = path.join(PATH_FILES_FOLDER, fileName);
      fs.writeFile(filePath, JSON.stringify(product, null, 2));
    });
  } catch (error) {
    console.log(error);
  }
};

createProductFiles();
