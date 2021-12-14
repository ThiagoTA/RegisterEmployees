import { Column, Entity, PrimaryGeneratedColumn,JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'

import Occupations from './Occupations'
import Departaments from './Departaments'
import Schoolings from './Schoolings'

@Entity('employees')
class Employees {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  costcenter: number;
  
  @Column()
  telephone: number;

  @Column()
  id_occupation: string;

  @ManyToOne(() => Occupations, Occupation => Occupation.employee)
  @JoinColumn({ name: 'id_occupation' })
  occupation: Occupations;

  @Column()
  id_schooling: string;

  @ManyToOne(() => Schoolings, Schooling => Schooling.employee)
  @JoinColumn({ name: 'id_schooling' })
  schooling: Schoolings;

  @Column()
  id_departament: string;

  @ManyToOne(() => Departaments, Departament => Departament.employee)
  @JoinColumn({ name: 'id_departament' })
  departament: Departaments;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date
}

export default Employees;