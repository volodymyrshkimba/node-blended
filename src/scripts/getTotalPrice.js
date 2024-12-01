import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

const getTotalPrice = async () => {
  try {
    const data = await fs.readFile(PATH_DB, "utf-8");
    const currentProducts = JSON.parse(data);
    const totalPrice = currentProducts.reduce(
      (acc, { price }) => acc + Number(price),
      0
    );
    console.log(totalPrice.toFixed(2));
  } catch (error) {
    console.log(error);
  }
};

getTotalPrice();
