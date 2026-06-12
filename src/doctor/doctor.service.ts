import { Injectable } from '@nestjs/common';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { Repository } from 'typeorm';
import { DoctorProfile } from './entities/doctor-profile.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';

import { ILike } from 'typeorm';
import { GetDoctorsQueryDto } from './dto/get-doctors-query.dto';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(DoctorProfile)
        private doctorRepository: Repository<DoctorProfile>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }
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
                    user: true,
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
        userId: string,
    ) {
        const profile =
            await this.doctorRepository.findOne({
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
                message: 'Doctor profile not found',
            };
        }
        const { password, ...userWithoutPassword } = profile.user;
        return {
            ...profile,
            user: userWithoutPassword,

        };
    }
    async updateProfile(
        userId: string,
        dto: UpdateDoctorProfileDto,
    ) {
        const profile =
            await this.doctorRepository.findOne({
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
                    'Doctor profile not found',
            };
        }
        Object.assign(profile, dto);
        await this.doctorRepository.save(profile);
        return {
            message:
                'Doctor profile updated Successfully',
        };
    }
    async getDoctors(
        query: GetDoctorsQueryDto,
    ) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        if (page < 1 || limit < 1) {
            return {
                message:
                    'Page and limit must be greater than 0',
            };
        }
        const where: any = {};
        if (query.specialization) {
            where.specialization =
                ILike(`%${query.specialization}%`);
        }
        if (query.search) {
            where.fullName =
                ILike(`%${query.search}%`);
        }
        const [doctors, total] =
            await this.doctorRepository.findAndCount({
                where,
                skip: (page - 1) * limit,
                take: limit,
            });
        if (doctors.length == 0) {
            return {
                message: 'No doctors found',
            }
        }
        return {
            total,
            page,
            limit,
            data: doctors,
        };
    }
    async getDoctorById(
        id: string,
    ) {
        const doctor =
            await this.doctorRepository.findOne({
                where: {
                    id,
                },
            });
        if (!doctor) {
            return {
                message: 'Doctor not found',
            };
        }
        return doctor;
    }

}