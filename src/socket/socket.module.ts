import { Module } from '@nestjs/common';
import { SocketClientProvider } from './socket-client.provider';

@Module({
  providers: [SocketClientProvider],
  exports: [SocketClientProvider],
})
export class SocketModule {}
