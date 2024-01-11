import { Controller, Post, Req, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'src/user/dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('api/v2/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('singin')
  @ApiOperation({ summary: 'SignIn' })
  async signIn(@Req() req: any) {
    return await this.authService.signIn(req.user);
  }

  @Post('singup')
  @ApiOperation({ summary: 'SignUp' })
  async signUp(@Body() userDTO: UserDTO) {
    return await this.authService.signUp(userDTO);
  }
}
