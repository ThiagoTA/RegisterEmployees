import { Request, Response } from 'express'
import { getConnection, getRepository } from 'typeorm'

import Employees from '../models/Employees'
import Occupations from '../models/Occupations'
import Departaments from '../models/Departaments'
import Schoolings from '../models/Schoolings'

import EmployeesView from '../views/employees_view'
import OccupationsView from '../views/occupations_view'
import DepartamentsView from '../views/departaments_view'
import SchoolingsView from '../views/schoolings_view'

export default {
  async create(req: Request, res: Response ){

    const {
      name,
      id_occupation,
      id_schooling,
      id_departament,
      costcenter,
      telephone,
      email  
    } = req.body

    const employeesRepo = getRepository(Employees)
    const occupationRepo = getRepository(Occupations)
    const schoolingRepo = getRepository(Schoolings)
    const departamentRepo = getRepository(Departaments)

    const data = {
      name,
      id_occupation,
      id_schooling,
      id_departament,
      costcenter,
      telephone,
      email    
    }
 
    const verifyEmail = await employeesRepo.findOne({email})

    if(verifyEmail) {
      return res.status(401).json('Email already exists!');
    }

    const requestingOccupation = await occupationRepo.findOne(id_occupation)
    const requestingSchooling = await schoolingRepo.findOne(id_schooling)
    const requestingDepartament = await departamentRepo.findOne(id_departament)

    if(!requestingOccupation || !requestingSchooling || !requestingDepartament ) {
      res.status(401).json('Id not found!');
    }

    const employee = employeesRepo.create(data)
    await employeesRepo.save(employee)
    return res.status(201).json(employee)
  },

  async index(req: Request, res: Response) {
    const employeeRepo = getRepository(Employees)
    const employeesFind = EmployeesView.renderMany(await employeeRepo.find({
      select: [
        'id', 
        'name',
        'id_occupation', 
        'id_schooling', 
        'id_departament', 
        'costcenter',
        'telephone',
        'email',
        'created_at',
        'updated_at'
      ]
    }))

    const occupationRepo = getRepository(Occupations)
    const schoolingRepo = getRepository(Schoolings)
    const departmentRepo = getRepository(Departaments)

    let result: Array<object> = []

    for (let i in employeesFind) {
      let occupation = OccupationsView.render(await occupationRepo.findOneOrFail(employeesFind[i].id_occupation))
      let schooling = SchoolingsView.render(await schoolingRepo.findOneOrFail(employeesFind[i].id_schooling))
      let department = DepartamentsView.render(await departmentRepo.findOneOrFail(employeesFind[i].id_departament))

    
      result[i] = {
        id: employeesFind[i].id,
        name: employeesFind[i].name,
        occupation: occupation.name,
        salary: occupation.salary,
        schooling: schooling.name,
        departament: department.name,
        costcenter: employeesFind[i].costcenter,
        telephone: employeesFind[i].telephone,
        email: employeesFind[i].email,
        created_at: employeesFind[i].created_at,
        updated_at: employeesFind[i].updated_at
      }
    }

    return res.json(result)
  },

  async show(req: Request, res: Response) {
    const { id } = req.params

    const employeeRepo = getRepository(Employees)
    const employeesFind = EmployeesView.renderMany(await employeeRepo.find({
      where: {
        id
      }
    }))

    const occupationRepo = getRepository(Occupations)
    const schoolingRepo = getRepository(Schoolings)
    const departmentRepo = getRepository(Departaments)


    let result: Array<object> = []

    for (let i in employeesFind) {
      let occupation = OccupationsView.render(await occupationRepo.findOneOrFail(employeesFind[i].id_occupation))
      let schooling = SchoolingsView.render(await schoolingRepo.findOneOrFail(employeesFind[i].id_schooling))
      let department = DepartamentsView.render(await departmentRepo.findOneOrFail(employeesFind[i].id_departament))
    
      result[i] = {
        id: employeesFind[i].id,
        name: employeesFind[i].name,
        occupation: occupation.name,
        salary: occupation.salary,
        schooling: schooling.name,
        department: department.name,
        costcenter: employeesFind[i].costcenter,
        telephone: employeesFind[i].telephone,
        email: employeesFind[i].email,
        created_at: employeesFind[i].created_at,
        updated_at: employeesFind[i].updated_at
      }
    }

    return res.json(result)
  },

  async update(req: Request, res: Response) {
    const { id } = req.params

    const employeesRepo = await getRepository(Employees)

    const {
      name,
      id_occupation,
      id_schooling,
      id_departament,
      costcenter,
      telephone,
      email  
    } = req.body

    const data = {
      name,
      id_occupation,
      id_schooling,
      id_departament,
      costcenter,
      telephone,
      email    
    }

    const occupationRepo = getRepository(Occupations)
    const schoolingRepo = getRepository(Schoolings)
    const departamentRepo = getRepository(Departaments)
 
    const requestingOccupation = await occupationRepo.findOne(id_occupation)
    const requestingSchooling = await schoolingRepo.findOne(id_schooling)
    const requestingDepartament = await departamentRepo.findOne(id_departament)

    if(!requestingOccupation || !requestingSchooling || !requestingDepartament ) {
      return res.status(401).json('Id not found!');
    }

    const verifyEmail = await employeesRepo.findOne({email})

    if(verifyEmail) {
      return res.status(401).json('Email already exists!');
    }

    const shared = await employeesRepo.findOneOrFail(id)

    if(!data.name) {
      data.name = shared.name
    }
    if(!data.id_occupation) {
      data.id_occupation = shared.id_occupation
    }
    if(!data.id_schooling) {
      data.id_schooling = shared.id_schooling
    }
    if(!data.id_departament) {
      data.id_departament = shared.id_departament
    }
    if(!data.costcenter) {
      data.costcenter = shared.costcenter
    }
    if(!data.telephone) {
      data.telephone = shared.telephone
    }
    if(!data.email) {
      data.email = shared.email
    } 

    await getConnection()
    .createQueryBuilder()
    .update(Employees)
    .set({
      name: data.name,
      id_occupation: data.id_occupation,
      id_schooling: data.id_schooling,
      id_departament: data.id_departament,
      costcenter: data.costcenter,
      telephone: data.telephone,
      email: data.email  
    })
    .where(`id = ${id}`)
    .execute();

    const updateEmployee = await employeesRepo.findOneOrFail(id)
    return res.json(EmployeesView.render(updateEmployee));
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params
    const employeeRepo = getRepository(Employees)
    await employeeRepo.delete(id)
    return res.json('Register Deleted')
  }
} 