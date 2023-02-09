export const resourceName = "resource";

export const resourceNamePlural = resourceName + "s";

export const routeParamKey = resourceName + "Id";

export const storedData: Record<string, StoreDataRow> = {
  name: {
    title: "Name",
    type: "text",
    required: true
  },
  password: {
    title: "Password",
    type: "password"
  },
  token: {
    title: "Token",
    type: "textarea"
  }
};
export const displayData = ["name"];

export const resourceNameCapitalized = resourceName[0].toUpperCase() + resourceName.substring(1);
export const resourceNamePluralCapitalized = resourceNamePlural[0].toUpperCase() + resourceNamePlural.substring(1);

export type IResource = { _id?: string } & {
  [key in keyof (typeof storedData)]: string;
};

export interface StoreDataRow {
  title: string;
  type: string;
  required?: boolean;
  options?: Record<string, string>;
} 