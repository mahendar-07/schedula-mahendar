import {
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateDoctorProfileDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsNumber()
  experience: number;

  @IsString()
  @IsNotEmpty()
  qualification: string;

  @IsNumber()
  consultationFee: number;

  @IsString()
  @IsNotEmpty()
  availability: string;

  @IsString()
  @IsNotEmpty()
  profileDetails: string;
}