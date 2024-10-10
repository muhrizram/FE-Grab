import { ReactNode } from "react";

export interface Column<T> {
  id: keyof T;
  label: string;
  sortable?: boolean;
}

export interface HistoryOrderTable {
  number?: string;
  "pax.fullName": string;
  "menu.name": string;
  "menu.price": string;
  status: ReactNode;
}
