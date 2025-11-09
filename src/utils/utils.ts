import { CONFIG } from "@/config-global";
import { ApiFakeResponse } from "@/types";
import { format, isThisYear, isToday, isYesterday } from "date-fns";

const noImage = "/images/no-image.png";

function generateRandomString(length: number) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset.charAt(randomIndex);
  }
  return randomString;
}

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
function isEmptyObject(obj: any) {
  const errors = [];

  // Check for empty object
  if (Object.keys(obj).length === 0) {
    errors.push("Object is empty");
  }

  // Validate properties
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      // Check for empty strings
      if (typeof value === "string" && value.trim() === "") {
        errors.push(`Property "${key}" is empty`);
      }

      // Check for empty arrays
      if (Array.isArray(value) && value.length === 0) {
        errors.push(`Property "${key}" is an empty array`);
      }

      // Recursively validate nested objects and arrays
      if (typeof value === "object" && value !== null) {
        const nestedErrors: any = isEmptyObject(value);
        errors.push(...nestedErrors);
      }
    }
  }
  return errors;
}

const convertListToDropdownList = (list: any[]): any[] => {
  const dropDownData: any[] = [];
  list.forEach((data) => {
    dropDownData.push({
      label: data.name,
      value: data.id,
    });
  });

  return dropDownData;
};

function formatDateTime(date: string | Date = new Date()) {
  if (isToday(new Date(date))) {
    return format(new Date(date), "HH:mm");
  }

  if (isYesterday(new Date(date))) {
    return "Yesterday";
  }

  if (isThisYear(new Date(date))) {
    return format(new Date(date), "dd MMM");
  }

  return format(new Date(date), "HH:mm dd/MM/yyyy");
}

const formatDate = (date: string | Date = new Date()) =>
  format(new Date(date), "HH:mm dd/MM/yyyy");

const fakeApiCall = (
  dataArray: any[] = [],
  shouldSucceed = true,
  delay = 2000
): Promise<ApiFakeResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve({ status: "success", data: dataArray }); // Resolve with the array
      } else {
        reject({
          status: "error",
          message: "API call failed!",
          data: dataArray,
        }); // Reject with the array
      }
    }, delay);
  });
};

const imageUtils = (url: string) => {
  let photo = "";
  if (!url) {
    photo = noImage;
  } else if (url.startsWith("https")) {
    photo = url;
  } else {
    photo = `${CONFIG.assetsDir}${url}`;
  }
  return photo;
};

const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const regex = /^\d{10,11}$/;
  return regex.test(phoneNumber);
};
export {
  capitalizeFirstLetter,
  convertListToDropdownList,
  fakeApiCall,
  formatDate,
  formatDateTime,
  generateRandomString,
  imageUtils,
  isEmptyObject,
  isValidEmail,
  isValidPhoneNumber,
};
