import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorProfile } from './entities/doctor-profile.entity';
import { User } from 'src/users/entities/user.entity';



@Module({
  imports:[
    TypeOrmModule.forFeature([
      DoctorProfile,
      User,
    ]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService]
})
export class DoctorModule {}
