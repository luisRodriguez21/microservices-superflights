import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectOptions } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassengerModule } from './passenger/passenger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions),
    PassengerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
