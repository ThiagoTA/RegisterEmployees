import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm'
import Employees from './Employees';

@Entity('schoolings')
class Schoolings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  schooling: string;

  @OneToMany(() => Employees, employee => employee.schooling, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'id_employee' })
  employee: Employees;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Schoolings