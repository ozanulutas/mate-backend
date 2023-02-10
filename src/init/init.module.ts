import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { InitController } from './init.controller';
import { InitService } from './init.service';

@Module({
  imports: [UserModule],
  controllers: [InitController],
  providers: [InitService],
})
export class InitModule {}
