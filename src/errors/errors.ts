import {
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class DataNotFoundException extends NotFoundException {
  constructor(name: string) {
    super(`${name} doesn't exist!`);
  }
}

export class FavsNotFoundException extends UnprocessableEntityException {
  constructor(name: string) {
    super(`${name} doesn't exist!`);
  }
}

export class WrongPassowrdException extends ForbiddenException {
  constructor() {
    super(`Wrong password`);
  }
}
