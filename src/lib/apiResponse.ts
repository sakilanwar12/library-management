import { TApiResponse } from "./common-api.types";

export function apiResponse<T, E = string>(
  success: boolean,
  message: string,
  payload: T | E
): TApiResponse<T, E> {
  if (success) {
    return {
      success: true,
      message,
      data: payload as T,
    };
  } else {
    return {
      success: false,
      message,
      error: payload as E,
    };
  }
}
