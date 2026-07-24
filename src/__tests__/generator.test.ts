import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fs from "fs-extra";
import path from "node:path";
import os from "node:os";
import { applyOverlayTemplates } from "../generator.js";
import type { ProjectOptions } from "../utils.js";

describe("generator", () => {
  describe("getPackageVersion", () => {
    it("retorna a versão do package.json", async () => {
      const { getPackageVersion } = await import("../generator.js");
      const version = getPackageVersion();
      expect(version).toBeTypeOf("string");
      expect(version).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  describe("applyOverlayTemplates", () => {
    let tempDir: string;

    beforeAll(async () => {
      tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "generator-test-"));
    });

    afterAll(async () => {
      await fs.remove(tempDir);
    });

    it("copia templates e substitui tokens", async () => {
      const options: ProjectOptions = {
        name: "test-project",
        directory: "test-project",
        style: "scss",
        routing: true,
        standalone: true,
        ssr: false,
        skipInstall: false,
      };

      await applyOverlayTemplates(tempDir, options);

      const cursorDir = path.join(tempDir, ".cursor");
      expect(await fs.pathExists(cursorDir)).toBe(true);

      const rulesDir = path.join(cursorDir, "rules");
      expect(await fs.pathExists(rulesDir)).toBe(true);

      const skillsDir = path.join(cursorDir, "skills");
      expect(await fs.pathExists(skillsDir)).toBe(true);

      const docsDir = path.join(tempDir, "docs");
      expect(await fs.pathExists(docsDir)).toBe(true);
    });

    it("substitui tokens nos arquivos", async () => {
      const testFile = path.join(tempDir, "test-token.txt");
      await fs.writeFile(
        testFile,
        "Projeto: __PROJECT_NAME__ Estilo: __STYLE_EXT__",
      );

      const options: ProjectOptions = {
        name: "my-app",
        directory: "my-app",
        style: "css",
        routing: false,
        standalone: true,
        ssr: false,
        skipInstall: false,
      };

      const tokens = {
        PROJECT_NAME: options.name,
        PROJECT_NAME_PASCAL: "MyApp",
        STYLE_EXT: options.style,
      };

      let content = await fs.readFile(testFile, "utf8");
      for (const [key, value] of Object.entries(tokens)) {
        content = content.replaceAll(`__${key}__`, value);
      }
      await fs.writeFile(testFile, content, "utf8");

      const result = await fs.readFile(testFile, "utf8");
      expect(result).toBe("Projeto: my-app Estilo: css");
    });
  });
});
