export type ApiFetch = (
  path: string,
  init?: RequestInit,
) => Promise<Response>;
