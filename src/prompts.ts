import { confirm, input, select } from "@inquirer/prompts";
import type { ProjectOptions } from "./utils.js";
import { toKebabCase } from "./utils.js";

export async function collectProjectOptions(
  defaults: Partial<ProjectOptions> = {},
): Promise<ProjectOptions> {
  const rawName =
    defaults.name ??
    (await input({
      message: "Nome do projeto:",
      validate: (value) =>
        value.trim().length > 0 || "Informe um nome para o projeto.",
    }));

  const name = toKebabCase(rawName);
  const directory =
    defaults.directory ??
    (await input({
      message: "Pasta de destino:",
      default: name,
    }));

  const style =
    defaults.style ??
    ((await select({
      message: "Estilo (CSS/SCSS):",
      choices: [
        { name: "SCSS (recomendado)", value: "scss" as const },
        { name: "CSS", value: "css" as const },
      ],
      default: "scss",
    })) as "css" | "scss");

  const routing =
    defaults.routing ??
    (await confirm({
      message: "Incluir Angular Router?",
      default: true,
    }));

  const standalone =
    defaults.standalone ??
    (await confirm({
      message: "Usar componentes standalone?",
      default: true,
    }));

  const ssr =
    defaults.ssr ??
    (await confirm({
      message: "Habilitar SSR (Angular Universal)?",
      default: false,
    }));

  const skipInstall =
    defaults.skipInstall ??
    (await confirm({
      message: "Pular npm install?",
      default: false,
    }));

  return {
    name,
    directory,
    style,
    routing,
    standalone,
    ssr,
    skipInstall,
  };
}
