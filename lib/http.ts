/** Parse a JSON request body. Returns `null` when the body is missing or not valid JSON. */
export const readJson = async <T = unknown>(request: Request): Promise<T | null> => {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
};
