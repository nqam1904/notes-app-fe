import { CONFIG } from "@/config-global";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422;

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;

  payload: {
    message: string;
    [key: string]: any;
  };

  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: 422;

  payload: EntityErrorPayload;

  constructor({
    status,
    payload,
  }: {
    status: 422;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

let clientLogoutRequest: null | Promise<any> = null;
export const isClient = () => typeof window !== "undefined";

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  try {
    let body: FormData | string | undefined;
    if (options?.body instanceof FormData) {
      const { body: bodyFormData } = options;
      body = bodyFormData;
    } else if (options?.body) {
      body = JSON.stringify(options.body);
    }
    const baseHeaders: {
      [key: string]: string;
    } =
      body instanceof FormData
        ? {}
        : {
            "Content-Type": "application/json",
          };
    // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
    // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server

    const baseUrl =
      options?.baseUrl === undefined ? CONFIG.serverUrl : options.baseUrl;

    const fullUrl = url.startsWith("/")
      ? `${baseUrl}${url}`
      : `${baseUrl}/${url}`;

    const res = await fetch(fullUrl, {
      ...options,
      cache: "no-store",
      headers: {
        ...baseHeaders,
        ...options?.headers,
      } as any,
      body,
      method,
    });
    const payload: Response = await res.json();
    const data = {
      status: res.status,
      payload,
    };
    // Interceptor là nời chúng ta xử lý request và response trước khi trả về cho phía component
    // if (!res.ok) {
    //   if (res.status === ENTITY_ERROR_STATUS) {
    //     throw new EntityError(
    //       data as {
    //         status: 422;
    //         payload: EntityErrorPayload;
    //       }
    //     );
    //   } else {
    //     return new HttpError(data);
    //   }
    // }
    return data;
  } catch (error) {
    const data = {
      status: -1,
      payload: {
        data: [],
        error: error.message,
      },
    };
    return new HttpError(data);
  }
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default http;
