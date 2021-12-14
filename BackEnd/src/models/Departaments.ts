import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm'
import Employees from './Employees';

@Entity('departaments')
class Departaments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Employees, employee => employee.departament, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'id_employee' })
  employee: Employees;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Departaments