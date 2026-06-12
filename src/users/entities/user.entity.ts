import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DoctorProfile } from 'src/doctor/entities/doctor-profile.entity';
import { OneToOne } from 'typeorm';
import { PatientProfile } from 'src/patient/entities/patient-profile.entity';
export enum Role {
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
}

@Entity()
export class User {
  @OneToOne(
    ()=>DoctorProfile,
    (DoctorProfile)=>DoctorProfile.user,
  
  )
  doctorProfile:DoctorProfile;

  @OneToOne(
    ()=>PatientProfile,
    (patientProfile)=>patientProfile.user,
  )
  patientProfile: PatientProfile;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;
}
