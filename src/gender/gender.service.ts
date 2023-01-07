import { Injectable } from '@nestjs/common';
import { GenderRepository } from './gender.repository';

@Injectable()
export class GenderService {
  constructor(private genderRepository: GenderRepository) {}

  getGenders() {
    return this.genderRepository.getGenders();
  }
}
