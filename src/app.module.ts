import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RecipesModule } from './recipes/recipes.module';
import { AuthModule } from './auth/auth.module';
import { SocialsModule } from './social/social.module';
import { TagsModule } from './tags/tags.module';
import { MultimediaModule } from './multimedia/multimedia.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles en toda la app
      load: [appConfig],
    }),
    UsersModule,
    AuthModule,
    RecipesModule,
    SocialsModule,
    TagsModule,
    MultimediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
