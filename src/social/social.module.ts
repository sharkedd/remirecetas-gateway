// src/socials/socials.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigType } from '@nestjs/config';
import appconfig from '../config/app.config';
import { SocialsService } from './social.service';
import { SocialsController } from './social.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ClientsModule.registerAsync([
      {
        name: 'SOCIALS_SERVICE',
        imports: [ConfigModule],
        inject: [appconfig.KEY],
        useFactory: (config: ConfigType<typeof appconfig>) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.amqp_uri],
            queue: config.social_queue ?? 'socials_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [SocialsController],
  providers: [SocialsService],
})
export class SocialsModule {}
