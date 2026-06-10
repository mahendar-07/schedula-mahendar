import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';
import { SignupDto } from './dto/signup.dto';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService:JwtService,
  ) { }

  async signup(signupDto: SignupDto) {
    const existingUser =
      await this.userRepository.findOne({
        where: {
          email: signupDto.email,
        },
      });

    if (existingUser) {
      throw new BadRequestException(
        'Email already exists',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        signupDto.password,
        10,
      );

    const user = new User();

    user.name = signupDto.name;
    user.email = signupDto.email;
    user.password = hashedPassword;
    user.role = signupDto.role;

    await this.userRepository.save(user);

    return {
      message:
        'User registered successfully',
    };
  }
  async login(loginDto:LoginDto){
    const user=await this.userRepository.findOne({
      where:{
        email:loginDto.email,
      },
    });
    if(!user){
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }
    const payload={
      sub:user.id,
      email:user.email,
      role:user.role,
    };
    return{
      access_token:this.jwtService.sign(payload),
    }
  }
}