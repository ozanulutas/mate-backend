import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { UserModule } from 'src/user/user.module';
import { InitController } from './init.controller';
import { InitService } from './init.service';

@Module({
  imports: [UserModule, MessageModule],
  controllers: [InitController],
  providers: [InitService],
})
export class InitModule {}
