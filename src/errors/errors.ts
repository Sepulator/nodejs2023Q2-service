import {
  ForbiddenException,
  HttpStatus,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class DataNotFoundException extends NotFoundException {
  constructor(name: string) {
    super(HttpStatus.NOT_FOUND, `${name} doesn't exist!`);
  }
}

export class FavsNotFoundException extends UnprocessableEntityException {
  constructor(name: string) {
    super(HttpStatus.UNPROCESSABLE_ENTITY, `${name} doesn't exist!`);
  }
}

export class WrongPassowrdException extends ForbiddenException {
  constructor() {
    super(HttpStatus.FORBIDDEN, `Wrong password`);
  }
}
