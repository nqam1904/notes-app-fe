import packageJson from "../package.json";

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  isStaticExport: boolean;
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: "FlickNote - Online",
  appVersion: packageJson.version,
  isStaticExport: process.env.NEXT_PUBLIC_STATIC_EXPORT === "true",
};
