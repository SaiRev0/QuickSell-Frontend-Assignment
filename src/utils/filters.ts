import { Options } from "../types/interfaces";

export const options: Options = {
  grouping: [
    { value: "status", label: "Status" },
    { value: "user", label: "User" },
    { value: "priority", label: "Priority" },
  ],
  ordering: [
    { value: "priority", label: "Priority" },
    { value: "title", label: "Title" },
  ],
};
