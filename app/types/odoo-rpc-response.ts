export interface OdooRPCResponse<T = any> {
  id: number | null;
  jsonrpc: string;
  result?: T | string;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}
