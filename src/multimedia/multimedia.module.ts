import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MultimediaService } from './multimedia.service';
import { MultimediaController } from './multimedia.controller';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'MULTIMEDIA_SERVICE',
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get('AMQP_URI')],
            queue: config.get('MULTIMEDIA_QUEUE') || 'multimedia_queue',
            queueOptions: { durable: false },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [MultimediaController],
  providers: [MultimediaService],
  exports: [MultimediaService],
})
export class MultimediaModule {}
