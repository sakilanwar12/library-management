// For error details like ValidationError
interface TValidationErrorDetail {
  message: string;
  name: string;
  properties?: {
    message: string;
    type: string;
    [key: string]: any;
  };
  kind?: string;
  path?: string;
  value?: any;
}

// Structure for ValidationError (can be extended)
interface TValidationError {
  name: string;
  errors: Record<string, TValidationErrorDetail>;
}

// Generic API Response
export type TApiResponse<T = null, E = TValidationError | string> =
  | {
      success: true;
      message: string;
      data: T;
    }
  | {
      success: false;
      message: string;
      error: E;
    };
