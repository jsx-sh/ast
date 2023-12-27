import { swc } from '../deps.ts';
import { MetaApplicationAST, MetaFunctionParamAST } from "./meta.ts";

export class ParseAST {
  public async parse(source: string): Promise<MetaApplicationAST> {
    const ast = await swc.parse(source, {
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
        const declaration = statement.declaration as swc.FunctionDeclaration;
        const name = declaration.identifier.value;

        application.functions.push({
          name,
          returnType: "string",
          params: declaration.params.map((param) => {
            return this.parseFunctionParam(param);
          }),
        });
      }
    }

    return application;
  }

  public parseFunctionParam(param: swc.Param): MetaFunctionParamAST {
    if ("left" in param.pat) {
      const left = param.pat.left as swc.Identifier;
      return {
        key: left.value,
        type: "string",
      };
    }

    return {
      key: (param.pat as swc.Identifier).value,
      type: "string",
    };
  }
}
