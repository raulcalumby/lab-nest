import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/clients')
@UseGuards(JwtAuthGuard)
export class FetchClientsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async handle() {
    const clients = await this.prisma.clients.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return clients
  }
}
