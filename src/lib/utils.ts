import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEmpty(value: string | unknown[] | null | undefined | number) {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    value === " " ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
}

export function capitalizeFirstLetter(string: string | null | undefined) {
  if (isEmpty(string)) return "";
  return string!.charAt(0).toUpperCase() + string!.slice(1);
}

export function isObjectEqual<T>(x: T, y: T): boolean {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === "object" && tx === ty
    ? ok(x).length === ok(y).length &&
    ok(x).every((key) =>
      isObjectEqual(
        (x as Record<string, unknown>)[key],
        (y as Record<string, unknown>)[key]
      )
    )
    : x === y;
}

export function removeArrayItems<T>(arr: Array<T>, values: Array<T>): Array<T> {
  return arr.filter((item) => !values.includes(item));
}