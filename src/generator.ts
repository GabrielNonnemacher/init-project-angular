import fs from "fs-extra";
import path from "node:path";
import { execa } from "execa";
import chalk from "chalk";
import type { ProjectOptions } from "./utils.js";
import {
  PACKAGE_ROOT,
  TEMPLATES_DIR,
  resolveProjectPath,
  toPascalCase,
} from "./utils.js";

async function replaceTokensInFile(
  filePath: string,
  tokens: Record<string, string>,
): Promise<void> {
  let content = await fs.readFile(filePath, "utf8");
  for (const [key, value] of Object.entries(tokens)) {
    content = content.replaceAll(`__${key}__`, value);
  }
  await fs.writeFile(filePath, content, "utf8");
}

async function replaceTokensInTree(
  rootDir: string,
  tokens: Record<string, string>,
): Promise<void> {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      await replaceTokensInTree(fullPath, tokens);
    } else {
      await replaceTokensInFile(fullPath, tokens);
    }
  }
}

export async function createAngularProject(
  cwd: string,
  options: ProjectOptions,
): Promise<string> {
  const projectPath = resolveProjectPath(cwd, options.directory);

  if (await fs.pathExists(projectPath)) {
    const files = await fs.readdir(projectPath);
    if (files.length > 0) {
      throw new Error(`A pasta "${options.directory}" já existe e não está vazia.`);
    }
  }

  const ngArgs = [
    "new",
    options.name,
    "--directory",
    options.directory,
    "--style",
    options.style,
    "--routing",
    String(options.routing),
    "--standalone",
    String(options.standalone),
    "--ssr",
    String(options.ssr),
    "--skip-git",
    "--package-manager",
    "npm",
  ];

  if (options.skipInstall) {
    ngArgs.push("--skip-install");
  }

  console.log(chalk.cyan("\nCriando projeto Angular...\n"));

  await execa("npx", ["@angular/cli@latest", ...ngArgs], {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  return projectPath;
}

export async function applyOverlayTemplates(
  projectPath: string,
  options: ProjectOptions,
): Promise<void> {
  const tokens = {
    PROJECT_NAME: options.name,
    PROJECT_NAME_PASCAL: toPascalCase(options.name),
    STYLE_EXT: options.style,
  };

  console.log(chalk.cyan("\nAplicando definições, padrões e skills...\n"));

  await fs.copy(TEMPLATES_DIR, projectPath, { overwrite: true });
  await replaceTokensInTree(projectPath, tokens);

  const docsDir = path.join(projectPath, "docs");
  await fs.ensureDir(docsDir);
}

export async function printNextSteps(
  projectPath: string,
  options: ProjectOptions,
): Promise<void> {
  const relativePath = path.relative(process.cwd(), projectPath) || ".";

  console.log(chalk.green("\nProjeto criado com sucesso!\n"));
  console.log(chalk.bold("Próximos passos:"));
  console.log(`  cd ${relativePath}`);

  if (options.skipInstall) {
    console.log("  npm install");
  }

  console.log("  npm start");
  console.log("\nArquivos adicionados pelo init-project-angular:");
  console.log("  .cursor/rules/     — regras e padrões do projeto");
  console.log("  .cursor/skills/    — skills para o agente Cursor");
  console.log("  docs/DEFINITIONS.md — glossário e definições");
  console.log("  docs/PATTERNS.md    — padrões de código Angular");
}

export function getPackageVersion(): string {
  const pkg = fs.readJsonSync(path.join(PACKAGE_ROOT, "package.json")) as {
    version: string;
  };
  return pkg.version;
}
