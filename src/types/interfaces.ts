export interface Ticket {
  id: string;
  title: string;
  tag: string[];
  userId: string;
  status: string;
  priority: number;
}

export interface User {
  id: string;
  name: string;
  available: boolean;
}

export interface Col {
  col: Ticket[];
}

export interface UserIdToData {
  userData: Record<string, User>;
}

export interface Option {
  value: string;
  label: string;
}

export interface Options {
  grouping: Option[];
  ordering: Option[];
}
