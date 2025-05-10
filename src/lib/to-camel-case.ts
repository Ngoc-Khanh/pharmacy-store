/* eslint-disable @typescript-eslint/no-explicit-any */
// Chuyển đổi từ snake_case -> camelCase
export const toCamelCase = <T>(obj: any): T => {
  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item)) as any;
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      acc[newKey] = toCamelCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
};
