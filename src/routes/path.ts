export const ROOT = {
  HOME: "/",
  NOTES: "/notes",
  AUTH: "/auth",
  SETTINGS: "/settings",
  ERROR: "/error",
};
export const ROUTES = {
  NOTES_ANONYMOUS: `${ROOT.NOTES}/:id`,
  FOLDERS: "/notes/folders",
  TRASH: `${ROOT.NOTES}/trash`,
  ARCHIVED: `${ROOT.NOTES}/archived`,
  SHARED: `${ROOT.NOTES}/shared`,
  SETTINGS: `${ROOT.SETTINGS}`,
  LOGIN: `${ROOT.AUTH}/login`,
  REGISTER: `${ROOT.AUTH}/register`,
  FORGOT_PASSWORD: `${ROOT.AUTH}/forgot-password`,
  ERROR_403: `${ROOT.ERROR}/403`,
  ERROR_404: `${ROOT.ERROR}/404`,
  ERROR_500: `${ROOT.ERROR}/500`,
};
