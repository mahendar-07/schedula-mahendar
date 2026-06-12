export class CreatePatientProfileDto {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  contactDetails: string;
  healthInfo?: string;
}