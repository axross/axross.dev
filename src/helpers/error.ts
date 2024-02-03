class KnownError extends Error {
  public readonly name = "KnownError";

  public readonly code: string;

  public readonly original?: unknown;

  public constructor(code: string, message: string, original?: unknown) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.code = code;
    this.original = original;

    Error.captureStackTrace(this);
  }
}

export { KnownError };
