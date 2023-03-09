import { Module } from '@nestjs/common';
import { SoketClientProvider } from './socket-client.provider';

@Module({
  providers: [SoketClientProvider],
  exports: [SoketClientProvider],
})
export class SocketModule {}
