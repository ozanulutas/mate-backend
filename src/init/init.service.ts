import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InitService {
  constructor(private userService: UserService) {}

  async init(userId: number) {
    const user = await this.userService.getUserConfig(userId);

    return {
      data: { user },
    };
  }
}
