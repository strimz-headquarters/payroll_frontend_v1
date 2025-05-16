// This file contains the types used in the dashboard component
export type SideBarLinksTypes = {
  href: string;
  title: string;
  icon: React.ReactNode;
};

// This type is used for the transaction history table
export type TxPropsTypes = {
  title: string;
  date: string;
  amount: string;
  token: "USDC" | "USDT";
  status: "Completed" | "Failed" | "In progress";
};

// This type is used for the CSV data
export type CVSDataType = {
  name: string;
  address: `0x${string}`;
  amount: number;
};

// This type is used for the table data
export type TableDataType = {
  id: number;
  name: string;
  address: string;
  amount: number;
  isEditing?: boolean;
};
