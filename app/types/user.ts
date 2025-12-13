export type User = {
  id: number | string;
  name: string;
  email: string;
  image_256?: string;
  image_1024?: string;
  company_id: string | number;
  role: string;
  is_employee?: boolean;
  is_support_user?: boolean;
};
