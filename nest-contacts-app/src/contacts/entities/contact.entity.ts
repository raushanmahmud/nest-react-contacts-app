import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column({ type: 'date' })
  dateOfBirth: string;
}
