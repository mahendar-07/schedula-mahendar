import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PatientProfile } from './entities/patient-profile.entity';
import { User } from 'src/users/entities/user.entity';

import { CreatePatientProfileDto } from './dto/create-patient-profile.dto';
import { UpdatePatientProfileDto } from './dto/update-patient-profile.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientProfile)
    private patientRepository: Repository<PatientProfile>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createProfile(
    userId: string,
    dto: CreatePatientProfileDto,
  ) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const existingProfile =
      await this.patientRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
        relations: {
          user: true,
        },
      });

    if (existingProfile) {
      return {
        message: 'Patient Profile already exists',
      };
    }

    const profile = new PatientProfile();

    profile.user = user!;
    profile.fullName = dto.fullName;
    profile.dateOfBirth = new Date(
      dto.dateOfBirth,
    );
    profile.gender = dto.gender;
    profile.contactDetails =
      dto.contactDetails;
    profile.healthInfo =
      dto.healthInfo;

    await this.patientRepository.save(
      profile,
    );

    return {
      message:
        'Patient profile created successfully',
    };
  }

  async getProfile(
    userId: string,
  ) {
    const profile =
      await this.patientRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
        relations: {
          user: true,
        },
      });

    if (!profile) {
      return {
        message:
          'Patient profile not found',
      };
    }

    const dob = new Date(
      profile.dateOfBirth,
    );

    const today = new Date();

    let age =
      today.getFullYear() -
      dob.getFullYear();

    const monthDiff =
      today.getMonth() -
      dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 &&
        today.getDate() <
          dob.getDate())
    ) {
      age--;
    }

    const {
      password,
      ...userWithoutPassword
    } = profile.user;

    return {
      ...profile,
      age,
      user: userWithoutPassword,
    };
  }

  async updateProfile(
    userId: string,
    dto: UpdatePatientProfileDto,
  ) {
    const profile =
      await this.patientRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
        relations: {
          user: true,
        },
      });

    if (!profile) {
      return {
        message:
          'Patient profile not found',
      };
    }

    if (dto.fullName) {
      profile.fullName =
        dto.fullName;
    }

    if (dto.dateOfBirth) {
      profile.dateOfBirth =
        new Date(dto.dateOfBirth);
    }

    if (dto.gender) {
      profile.gender =
        dto.gender;
    }

    if (dto.contactDetails) {
      profile.contactDetails =
        dto.contactDetails;
    }

    if (dto.healthInfo) {
      profile.healthInfo =
        dto.healthInfo;
    }

    await this.patientRepository.save(
      profile,
    );

    return {
      message:
        'Patient profile updated successfully',
    };
  }
}