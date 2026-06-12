import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { DoctorService } from './doctor.service';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';
@Controller('doctor')
export class DoctorController {
  constructor(
    private readonly doctorService:DoctorService,
  ){}
  @Post('profile')
  @UseGuards(JwtAuthGuard)
  createProfile(
    @Req() req,
    @Body() dto:CreateDoctorProfileDto,  
  ){
    console.log(req.user);
    return this.doctorService.createProfile(
      req.user.sub,
      dto,
    );
  }@Get('profile')
@Roles('DOCTOR')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
getProfile(
  @Req() req,
) {
  return this.doctorService.getProfile(
    req.user.sub,
  );
}
@Patch('profile')
@Roles('DOCTOR')
@UseGuards(JwtAuthGuard, RolesGuard)
updateProfile(
  @Req() req,
  @Body() dto: UpdateDoctorProfileDto,
) {
  console.log('PATCH USER:', req.user);

  return this.doctorService.updateProfile(
    req.user.sub,
    dto,
  );
}

}