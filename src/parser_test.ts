import { path } from '../deps.ts';
import { assert } from "../dev_deps.ts";
import { ParseAST } from "./parser.ts";

Deno.test("Test simple typescript AST parsing", async () => {
  const parser = await ParseAST.initialize();
  const mockPath = path.join(Deno.cwd(), "examples", "hello.example.ts");

  const rawFile = Deno.readTextFileSync(mockPath);
  const ast = await parser.parse(rawFile);

  assert.assertEquals(ast.functions.length, 1);
  assert.assertEquals(ast.functions[0].name, "hello");
  assert.assertEquals(ast.functions[0].params?.length, 1);
});