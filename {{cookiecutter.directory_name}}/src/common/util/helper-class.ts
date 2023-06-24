export class Helper {
  public static returnNonEmptyObj(
    obj: Record<string, any>,
  ): Record<string, any> {
    const conditions: Record<string, string> = {};
    const keys = Object.keys(obj);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      if (obj[key]) {
        conditions[key] = obj[key];
      }
    }
    return conditions;
  }

  public static createUniqueArray(array: any[]): any[] {
    const tempSet = new Set<string>();
    const uniqueArray: any[] = [];
    array.map((i) => tempSet.add(JSON.stringify(i)));
    tempSet.forEach((t) => uniqueArray.push(JSON.parse(t)));
    return uniqueArray;
  }

  public static intersectionArray<T>(arrays: T[][]): T[] {
    if (!arrays || arrays.length === 0) return [];

    // Get the first array as the base for comparison
    const firstArray = arrays[0];

    // Filter the elements present in all arrays
    const result = firstArray.filter((item) => {
      return arrays.every((array) => {
        return array.indexOf(item) !== -1;
      });
    });

    return result;
  }

  public static sortObjectByKeys(
    obj: Record<string, any>,
  ): Record<string, any> {
    // Get the keys and sort them
    const sortedKeys = Object.keys(obj).sort();

    // Create a new object to store the sorted key-value pairs
    const sortedObj: Record<string, any> = {};

    // Iterate through the sorted keys array and add key-value pairs to the new object
    for (const key of sortedKeys) {
      sortedObj[key] = obj[key]; //.replace(/%20/g, '+');
    }

    return sortedObj;
  }

  public static replaceURIComponent(
    obj: Record<string, any>,
  ): Record<string, any> {
    for (const [key, value] of Object.entries(obj)) {
      obj[key] = value.replace(/%20/g, '+');
    }
    return obj;
  }
}
