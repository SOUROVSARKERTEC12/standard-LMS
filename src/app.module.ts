import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module'; // 1. Import new module
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    // 1. Load ConfigModule globally (still the best place for it)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),

    // 2. Import your new DatabaseModule
    DatabaseModule,

    // 3. Your feature modules
    AuthModule,
    UserModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
