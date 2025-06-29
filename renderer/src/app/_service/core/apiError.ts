export interface ErrorResponse {
  message: string;
  code: string;
}

export class ApiError extends Error {
  public readonly status: number;
  public readonly data: ErrorResponse;

  constructor(status: number, data: ErrorResponse) {
    super(data.message);

    this.status = status;
    this.data = data;
  }
}