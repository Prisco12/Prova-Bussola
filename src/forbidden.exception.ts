import { HttpException, HttpStatus } from "@nestjs/common";

export class DeleteForbiddenException extends HttpException {
    constructor() {
      super('Forbidden', HttpStatus.FORBIDDEN);
    }
  }