import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { LoginDto, UserDto } from './dto/user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('getUser')
  async getUserById(@Body() body: { userId: string }) {
    return this.authService.findUserById(body.userId);
  }

  @ApiOperation({ summary: 'It register a new user' })
  @ApiResponse({
    status: 201,
    description:
      "user's account has been created successfully. You can now create a todo",
  })
  @Post('register')
  async register(@Body() dto: UserDto) {
    return this.authService.register(
      dto.firstName,
      dto.lastName,
      dto.email,
      dto.password,
    );
  }

  @ApiOperation({ summary: 'It logs in an existing user' })
  @ApiResponse({
    status: 201,
    description: "You've logged in succesfully",
  })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
