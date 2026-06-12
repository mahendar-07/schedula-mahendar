import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { PatientService } from './patient.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { CreatePatientProfileDto } from './dto/create-patient-profile.dto';
import { UpdatePatientProfileDto } from './dto/update-patient-profile.dto';
import { Role } from 'src/users/entities/user.entity';
@Controller('patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
  ){}
  @Post('profile')
  @Roles('PATIENT')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  createProfile(
    @Req() req,
    @Body() dto: CreatePatientProfileDto,
  ){
    return this.patientService.createProfile(
      req.user.sub,
      dto,
    );
  }
  @Get('profile')
  @Roles('PATIENT')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )getProfile( @Req() req,){
    return this.patientService.getProfile(
      req.user.sub,
    );
  }
  @Patch('profile')
  @Roles('PATIENT')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  updateProfile(
    @Req() req,
    @Body() dto: UpdatePatientProfileDto,
  ){
    return this.patientService.updateProfile(
      req.user.sub,
      dto,
    );
  }
}