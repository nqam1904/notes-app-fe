import { format } from "date-fns";
const logResponse = (
  level: "info" | "warn" | "error",
  actionName: string,
  startTime: number,
  response: any,
) => {
  const endTime = Date.now();
  const duration = endTime - startTime + "ms";
  const date = format(new Date(), "dd/MM/yyyy");
  const logMessage = `[${date}] [${level.toUpperCase()}] ${actionName} executed in ${duration}`;
  console[level](`${logMessage} - Response: ${JSON.stringify(response)}`);
};

const logAction = (
  level: "info" | "warn" | "error",
  actionName: string,
  startTime: number,
  message?: string,
  payload?: any,
) => {
  const endTime = Date.now();
  const duration = endTime - startTime + "ms";
  const date = format(new Date(), "dd/MM/yyyy");
  const logMessage = `[${date}] [${level.toUpperCase()}] ${actionName} executed in ${duration}`;
  if (message) {
    console[level](`${logMessage} - ${message}`);
  } else {
    console[level](logMessage);
  }
  if (payload) {
    console[level](`Payload: ${JSON.stringify(payload)}`);
  }
};

const withLogging = (actionName: string, action: Function) => {
  return async (...args: any[]) => {
    const start = Date.now();
    try {
      const result = await action(...args);
      logAction("info", actionName, start, undefined, args[0]);
      return result;
    } catch (error: any) {
      logAction("error", actionName, start, error.message, args[0]);
      throw error;
    }
  };
};


// TRACKING ERROR IN PRODUCTION
const logError = (error: any, functionName: string) => {
  const date = format(new Date(), "dd/MM/yyyy HH:mm:ss");
  console.error(`[${date}] Error in ${functionName}: ${error.message}`);
  console.error(`Stack trace: ${error.stack}`);
};

const handleError = async (
  fn: Function,
  functionName: string,
  ...args: any[]
) => {
  try {
    return await fn(...args);
  } catch (error) {
    logError(error, functionName);
    throw error;
  }
};

export { logAction, logResponse, withLogging, handleError };
