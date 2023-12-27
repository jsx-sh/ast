import { swc } from "../deps.ts";
import { MetaApplicationAST, MetaFunctionParamAST } from "./meta.ts";

const { default: initSwc, parse } = swc;

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

    for (const statement of ast.body as any[]) {
      if (statement.type === "ExportDeclaration") {
        const declaration = statement.declaration;
        const name = declaration.identifier.value;

        application.functions.push({
          name,
          returnType: "string",
          params: declaration.params.map((param: any) => {
            return this.parseFunctionParam(param);
          }),
        });
      }
    }

    return application;
  }

  public parseFunctionParam(param: any): MetaFunctionParamAST {
    if ("left" in param.pat) {
      const left = param.pat.left;
      return {
        key: left.value,
        type: "string",
      };
    }

    return {
      key: param.pat.value,
      type: "string",
    };
  }
}
