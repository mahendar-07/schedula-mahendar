import { Injectable } from '@nestjs/common';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { Repository } from 'typeorm';
import { DoctorProfile } from './entities/doctor-profile.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';
import { profile } from 'console';

@Injectable()
export class DoctorService {
constructor(
    @InjectRepository(DoctorProfile)
    private doctorRepository:Repository<DoctorProfile>,

    @InjectRepository(User)
    private userRepository:Repository<User>,
){ }
async createProfile(
  userId: string,
  dto: CreateDoctorProfileDto,
) {
  const user = await this.userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const existingProfile =
    await this.doctorRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user:true,
      },
    });

  if (existingProfile) {
    return {
      message: 'Doctor Profile already exists',
    };
  }

  const profile = new DoctorProfile();

  profile.user = user!;

  profile.fullName = dto.fullName;
  profile.specialization = dto.specialization;
  profile.experience = dto.experience;
  profile.qualification = dto.qualification;
  profile.consultationFee = dto.consultationFee;
  profile.availability = dto.availability;
  profile.profileDetails = dto.profileDetails;

  await this.doctorRepository.save(profile);

  return {
    message: 'Doctor profile created successfully',
  };
}
async getProfile(
    userId:string,
){
    const profile=
    await this.doctorRepository.findOne({
        where:{
            user:{
                id:userId,
            },
        },
        relations:{
            user:true,
        },
    });
    if(!profile){
        return {
            message: 'Doctor profile not found',
        };
    }
    const { password,...userWithoutPassword}=profile.user;
    return {
        ...profile,
        user:userWithoutPassword,
    
    };
}
async updateProfile(
    userId:string,
    dto:UpdateDoctorProfileDto,
){
    const profile=
    await this.doctorRepository.findOne({
        where:{
            user:{
                id: userId,
            },
        },
        relations:{
            user:true,
        },
    });
    if(!profile){
        return {
            message:
            'Doctor profile not found',
        };
    }
    Object.assign(profile,dto);
    await this.doctorRepository.save(profile);
    return {
        message:
        'Doctor profile updated Successfully',
    };
}
}