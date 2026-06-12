import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

import { PatientProfile } from './entities/patient-profile.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PatientProfile,
      User,
    ]),
  ],
  controllers: [PatientController],
  providers: [PatientService]
})
export class PatientModule {}
