import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm'
import Employees from './Employees';

@Entity('occupations')
class Occupations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  salary: number;

  @OneToMany(() => Employees, employee => employee.occupation, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'id_employee' })
  employee: Employees;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Occupations