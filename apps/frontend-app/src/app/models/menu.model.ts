type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  url: string;
  icon: string | null;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  children?: MenuItem[];
};

type Menu = Record<string, MenuItem>;

export type {
  Menu, MenuItem
}