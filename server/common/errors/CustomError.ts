import STATUS_CODES from '../constants/statusCodes';

export class CustomError extends Error {

  public status: STATUS_CODES;

  constructor(message: string, status: STATUS_CODES) {
    super(message);
    this.status = status;
  }

}