import { describe, it, expect } from "vitest";
import { toKebabCase, toPascalCase, resolveProjectPath } from "../utils.js";

describe("toKebabCase", () => {
  it("converte camelCase para kebab-case", () => {
    expect(toKebabCase("myComponent")).toBe("my-component");
  });

  it("converte PascalCase para kebab-case", () => {
    expect(toKebabCase("MyComponent")).toBe("my-component");
  });

  it("converte snake_case para kebab-case", () => {
    expect(toKebabCase("my_component")).toBe("my-component");
  });

  it("converte espaços para kebab-case", () => {
    expect(toKebabCase("my component")).toBe("my-component");
  });

  it("remove caracteres especiais", () => {
    expect(toKebabCase("my@component!")).toBe("mycomponent");
  });

  it("remove espaços extras", () => {
    expect(toKebabCase("  my component  ")).toBe("my-component");
  });

  it("lida com camelCase simples", () => {
    expect(toKebabCase("myURLService")).toBe("my-urlservice");
  });

  it("lida com apenas maiúsculas no início", () => {
    expect(toKebabCase("XMLParser")).toBe("xmlparser");
  });

  it("lida com string vazia", () => {
    expect(toKebabCase("")).toBe("");
  });

  it("lida com números", () => {
    expect(toKebabCase("component1")).toBe("component1");
  });
});

describe("toPascalCase", () => {
  it("converte kebab-case para PascalCase", () => {
    expect(toPascalCase("my-component")).toBe("MyComponent");
  });

  it("converte snake_case para PascalCase", () => {
    expect(toPascalCase("my_component")).toBe("MyComponent");
  });

  it("converte espaços para PascalCase", () => {
    expect(toPascalCase("my component")).toBe("MyComponent");
  });

  it("lida com string já em PascalCase", () => {
    expect(toPascalCase("MyComponent")).toBe("Mycomponent");
  });

  it("lida com string vazia", () => {
    expect(toPascalCase("")).toBe("");
  });

  it("lida com múltiplos separadores", () => {
    expect(toPascalCase("my--component__name")).toBe("MyComponentName");
  });

  it("lida com números", () => {
    expect(toPascalCase("component-1")).toBe("Component1");
  });
});

describe("resolveProjectPath", () => {
  it("resolve caminho relativo", () => {
    const result = resolveProjectPath("/home/user", "my-project");
    expect(result).toContain("my-project");
  });

  it("resolve caminho absoluto", () => {
    const result = resolveProjectPath("/home/user", "/absolute/path");
    expect(result).toContain("absolute");
  });
});
