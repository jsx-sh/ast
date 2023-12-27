import { assertEquals } from "$assert";
import { join } from "$std";
import { ParseAST } from "./parser.ts";

Deno.test("Test simple typescript AST parsing", async () => {
  const parser = await ParseAST.initialize();
  const mockPath = join(Deno.cwd(), "examples", "hello.example.ts");

  const rawFile = Deno.readTextFileSync(mockPath);
  const ast = await parser.parse(rawFile);

  assertEquals(ast.functions.length, 1);
  assertEquals(ast.functions[0].name, "hello");
  assertEquals(ast.functions[0].params?.length, 1);
});