import { v4 as uuidv4 } from "uuid";
import { writeFile, readFile } from "fs/promises";

export async function createUuid() {
  const uuid = uuidv4();
  await writeFile("./uuid", uuid);
  return uuid;
}

export async function getUuid() {
  const uuid = await readFile("./uuid");
  console.log(uuid.toString());
  return uuid.toString();
}
