import * as fs from "fs/promises"

/**
 * Read a Local JSON File
 * @param filePath Path to JSON file
 * @returns Parsed JSON file or null if error occurs
 */
export const readJsonFile = async (filePath: string) => {
  try {
    const data = await fs.readFile(filePath, "utf8")
    return JSON.parse(data)
  } catch (err) {
    console.error(`Error reading file '${filePath}': ${err}`)
    return null
  }
}

/**
 * Write a Data for a Local JSON File
 * @param filePath Path to JSON file
 * @param data The data to write
 * @returns true if success or null if error
 */
export const writeJsonFile = async (filePath: string, data: any) => {
  try {
    const json = JSON.stringify(data, null, 2)
    await fs.writeFile(filePath, json, "utf8")
    return true
  } catch (err) {
    console.error(`Error writing file '${filePath}': ${err}`)
    return null
  }
}
