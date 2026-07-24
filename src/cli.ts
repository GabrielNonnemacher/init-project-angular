#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { collectProjectOptions } from "./prompts.js";
import {
  applyOverlayTemplates,
  createAngularProject,
  getPackageVersion,
  printNextSteps,
} from "./generator.js";
import type { ProjectOptions } from "./utils.js";

const program = new Command();

program
  .name("init-project-angular")
  .description(
    "Inicia um projeto Angular com definições, padrões e skills para Cursor",
  )
  .version(getPackageVersion())
  .option("-n, --name <name>", "Nome do projeto")
  .option("-d, --directory <dir>", "Pasta de destino")
  .option("--style <style>", "css ou scss", "scss")
  .option("--no-routing", "Desabilitar Angular Router")
  .option("--no-standalone", "Desabilitar componentes standalone")
  .option("--ssr", "Habilitar SSR")
  .option("--skip-install", "Pular npm install")
  .action(async (cliOptions) => {
    try {
      const defaults: Partial<ProjectOptions> = {};

      if (cliOptions.name) defaults.name = cliOptions.name;
      if (cliOptions.directory) defaults.directory = cliOptions.directory;
      if (cliOptions.style) defaults.style = cliOptions.style as "css" | "scss";
      if (cliOptions.routing === false) defaults.routing = false;
      if (cliOptions.standalone === false) defaults.standalone = false;
      if (cliOptions.ssr) defaults.ssr = true;
      if (cliOptions.skipInstall) defaults.skipInstall = true;

      const options = await collectProjectOptions(defaults);
      const projectPath = await createAngularProject(process.cwd(), options);
      await applyOverlayTemplates(projectPath, options);
      await printNextSteps(projectPath, options);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido ao criar o projeto.";
      console.error(chalk.red(`\nErro: ${message}\n`));
      process.exit(1);
    }
  });

program.parse();
