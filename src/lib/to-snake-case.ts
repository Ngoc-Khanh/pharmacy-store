/* eslint-disable @typescript-eslint/no-explicit-any */
// Chuyển đổi từ camelCase -> snake_case
export const toSnakeCase = <T>(obj: any): T => {
  if (Array.isArray(obj)) {
    return obj.map((item) => toSnakeCase(item)) as any;
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      acc[newKey] = toSnakeCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
};
