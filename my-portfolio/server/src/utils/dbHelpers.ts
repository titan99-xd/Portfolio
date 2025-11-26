import type { RowDataPacket } from "mysql2";

// result is always a tuple: [rows, fields]
// we type it correctly to avoid "any"
export function safeRows<T extends RowDataPacket>(
  result: [T[] | RowDataPacket[], unknown]
): T[] {
  const rows = result[0];
  return (rows ?? []) as T[];
}
