import { EachRoute, ROUTES } from "@/lib/routes-config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Searches for routes that match a query string, with optional depth control.
 *
 * @param {string} query - The search query to match against node titles.
 * @param {EachRoute} node - The current route node being examined.
 * @param {string} prefix - The URL prefix to prepend to the node"s href.
 * @param {number} currentLevel - The current depth level in the route hierarchy.
 * @param {number} [maxLevel] - The maximum depth level to search. If undefined, searches all levels.
 * @returns {EachRoute[]} An array of routes that match the search query.
 *
 * @example
 * ```typescript
 * const results = helperSearch("home", node, "/base", 1);
 * ```
 */
export function helperSearch(
  query: string,
  node: EachRoute,
  prefix: string,
  currenLevel: number,
  maxLevel?: number
) {
  const res: EachRoute[] = [];
  let parentHas = false;

  const nextLink = `${prefix}${node.href}`;
  if (!node.noLink && node.title.toLowerCase().includes(query.toLowerCase())) {
    res.push({ ...node, items: undefined, href: nextLink });
    parentHas = true;
  }
  const goNext = maxLevel ? currenLevel < maxLevel : true;
  if (goNext)
    node.items?.forEach((item) => {
      const innerRes = helperSearch(
        query,
        item,
        nextLink,
        currenLevel + 1,
        maxLevel
      );
      if (!!innerRes.length && !parentHas && !node.noLink) {
        res.push({ ...node, items: undefined, href: nextLink });
        parentHas = true;
      }
      res.push(...innerRes);
    });
  return res;
}

/**
 * Performs an advanced search across all routes and returns matched results.
 *
 * @param {string} query - The search query to match against node titles.
 * @returns {EachRoute[]} An array of all routes matching the search query.
 *
 * @example
 * ```typescript
 * const results = advanceSearch("about");
 * ```
 */
export function advanceSearch(query: string) {
  return ROUTES.map((node) =>
    helperSearch(query, node, "", 1, query.length == 0 ? 2 : undefined)
  ).flat();
}

/**
 * Formats a date string from "day-month-year" format to a long date string in Russian.
 *
 * @param {string} dateStr - The date string in "day-month-year" format.
 * @returns {string} The formatted date string in "Thursday, April 3, 2024" format (ru-RU locale).
 *
 * @example
 * ```typescript
 * const formattedDate = formatDate("3-4-2024");
 * console.log(formattedDate); // "Thursday, April 3, 2024"
 * ```
 */
export function formatDate(dateStr: string): string {
  const [day, month, year] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return capitalize(date.toLocaleDateString("ru-RU", options));
}

/**
 * Formats a date string from "day-month-year" format to a short date string in Russian.
 *
 * @param {string} dateStr - The date string in "day-month-year" format.
 * @returns {string} The formatted date string in "April 3, 2024" format (ru-RU locale).
 *
 * @example
 * ```typescript
 * const formattedDate = formatDate2("3-4-2024");
 * console.log(formattedDate); // "April 3, 2024"
 * ```
 */
export function formatDate2(dateStr: string): string {
  const [day, month, year] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return capitalize(date.toLocaleDateString("ru-RU", options));
}

/**
 * Converts a date string in "day-month-year" format to a Date object.
 *
 * @param {string} date - The date string in "day-month-year" format.
 * @returns {Date} The Date object representing the given date.
 *
 * @example
 * ```typescript
 * const dateObj = stringToDate("3-4-2024");
 * console.log(dateObj); // Date object for April 3, 2024
 * ```
 */
export function stringToDate(date: string): Date {
	const [day, month, year] = date.split("-").map(Number);
	return new Date(year, month - 1, day);
}

/**
 * Disables the context menu (right-click menu) on elements with the specified class name.
 *
 * This function adds an event listener to the document that prevents the default context menu
 * from appearing when the user right-clicks on elements that have the specified class name.
 *
 * @param {string} className - The class name of the elements for which the context menu should be disabled.
 * @example
 * // Disable context menu on elements with class "no-context-menu"
 * disableContextMenu("no-context-menu");
 */
export function disableContextMenu(className: string): void {
	addEventListener("contextmenu", (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		if (target instanceof HTMLElement && target.classList.contains(className)) {
			event.preventDefault();
		}
	});
};

/**
 * Capitalizes the first letter of a string, optionally converting the rest of the string to lowercase.
 *
 * @param {string} str - The string to be capitalized.
 * @param {boolean} [toLowerRest=false] - If `true`, converts all characters after the first letter to lowercase.
 * @returns {string} The capitalized string with optional conversion of the remaining characters.
 *
 * @example
 * ```typescript
 * capitalize("hello world"); // "Hello world"
 * capitalize("hello world", true); // "Hello world"
 * capitalize("hELLO wORLD", true); // "Hello world"
 * capitalize("hELLO wORLD", false); // "HELLO wORLD"
 * ```
 */
function capitalize(str: string, toLowerRest?: boolean): string {
    if (str.length === 0) return str;
    return `${
        str.charAt(0).toUpperCase()
    }${
        toLowerRest ? str.slice(1).toLowerCase() : str.slice(1)
    }`;
}
