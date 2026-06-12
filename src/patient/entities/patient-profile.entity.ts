import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class PatientProfile{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @OneToOne(()=>User)
    @JoinColumn()
    user:User;

    @Column()
    fullName:string;

    @Column({
        type:'date',
    })
    dateOfBirth: Date;

    @Column()
    gender:string;

    @Column()
    contactDetails:string;

    @Column({nullable:true})
    healthInfo?:string;
}