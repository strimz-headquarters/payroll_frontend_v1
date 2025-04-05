export type SideBarLinksTypes = {
  href: string;
  title: string;
  icon: React.ReactNode;
};

export type TxPropsTypes = {
  title: string;
  date: string;
  amount: string;
  token: "USDC" | "USDT";
  status: "Completed" | "Failed" | "In progress";
};
