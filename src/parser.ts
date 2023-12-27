import { AssignmentPattern, FunctionDeclaration, Identifier, initSwc, parse, type Param } from "../deps/swc.ts";
import { MetaApplicationAST, MetaFunctionParamAST } from "./meta.ts";

export class ParseAST {
  protected constructor() {

  }

  public static async initialize() {
    await initSwc();
    return new ParseAST();
  }

  public async parse(source: string): Promise<MetaApplicationAST> {
    const ast = await parse(source, {
      syntax: "typescript",
      dynamicImport: true,
      tsx: true,
    });

    const application: MetaApplicationAST = {
      name: "app",
      functions: [],
    };

    for (const statement of ast.body) {
      if (statement.type === "ExportDeclaration") {
        const declaration = statement.declaration as FunctionDeclaration;
        const name = declaration.identifier.value;

        application.functions.push({
          name,
          returnType: "string",
          params: declaration.params.map((param: Param) => {
            return this.parseFunctionParam(param);
          }),
        });
      }
    }

    return application;
  }

  public parseFunctionParam(param: Param): MetaFunctionParamAST {
    if ("left" in param.pat) {
      const left = (param.pat as AssignmentPattern).left as Identifier;
      return {
        key: left.value,
        type: "string",
      };
    }

    return {
      key: (param.pat as Identifier).value,
      type: "string",
    };
  }
}
