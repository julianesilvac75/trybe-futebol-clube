// Referência: https://github.com/tryber/sd-019-c-trybe-futebol-clube/pull/12/files#diff-bb75b8196d874f40a936219a7b55050216c26423961d0bc14b66498d1ca14db4

class CustomError extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
    this.message = message;
  }
}

export default CustomError;
