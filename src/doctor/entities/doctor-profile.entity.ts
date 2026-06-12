import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';

@Entity()
export class DoctorProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  fullName: string;

  @Column()
  specialization: string;

  @Column()
  experience: number;

  @Column()
  qualification: string;

  @Column()
  consultationFee: number;

  @Column()
  availability: string;

  @Column({
    nullable: true,
  })
  profileDetails?: string;
}