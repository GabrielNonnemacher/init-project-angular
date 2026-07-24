import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PACKAGE_ROOT = path.resolve(__dirname, "..");
export const TEMPLATES_DIR = path.join(PACKAGE_ROOT, "templates", "overlay");

export interface ProjectOptions {
  name: string;
  directory: string;
  style: "css" | "scss";
  routing: boolean;
  standalone: boolean;
  ssr: boolean;
  skipInstall: boolean;
}

export function resolveProjectPath(cwd: string, directory: string): string {
  return path.resolve(cwd, directory);
}

export function toKebabCase(value: string): string {
  return value
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
}

export function toPascalCase(value: string): string {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");
}
