export type ApiFakeResponse = {
  status: "success" | "error";
  data: any;
  message?: string;
};
