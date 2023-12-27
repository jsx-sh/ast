export interface MetaFunctionParamAST {
  key: string;
  type: string;
  default?: string;
}

export interface MetaFunctionAST {
  name: string;
  async?: boolean;
  returnType?: string;
  params?: MetaFunctionParamAST[];
}

export interface MetaApplicationAST {
  name: string;
  functions: MetaFunctionAST[];
}