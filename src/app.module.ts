import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.model'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateClientsController } from './controllers/create-clients.controller'
import { FetchClientsController } from './controllers/fetch-clients.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateClientsController,
    FetchClientsController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
