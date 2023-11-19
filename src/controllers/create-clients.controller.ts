import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const createClientBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(10).max(11),
})

type createClientBodySchema = z.infer<typeof createClientBodySchema>

@Controller('/clients')
@UseGuards(JwtAuthGuard)
export class CreateClientsController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createClientBodySchema))
  async handle(@Body() body: createClientBodySchema) {
    const { name, email, phone } = createClientBodySchema.parse(body)

    await this.prisma.clients.create({
      data: {
        name,
        email,
        phone,
      },
    })
  }
}
