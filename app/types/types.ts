export interface AbstractResponse {
  message?: string;
  error?: string;
  code?: string;
  success?: boolean;
}

export interface HookReturn {
  loading: boolean;
  error: string | null;
}

export interface Response extends AbstractResponse {
  page: number;
  page_size: number;
  total_count: number;
}
