export class GetDoctorsQueryDto {
  search?: string;

  specialization?: string;

  page?: number;

  limit?: number;

  availability?: string;
}