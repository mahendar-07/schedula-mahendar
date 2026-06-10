import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('doctor')
export class DoctorController {
  @Get('profile')
  @Roles('DOCTOR')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  getProfile() {
    return {
      message: 'Doctor Profile',
    };
  }
}