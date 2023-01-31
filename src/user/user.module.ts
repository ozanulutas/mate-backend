import { Module } from '@nestjs/common';
import { LocationModule } from 'src/location/location.module';
import { PostModule } from 'src/post/post.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [LocationModule, PostModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
