import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Departaments from '../models/Departaments'
import DepartamentsView from '../views/departaments_view'

export default {
  async create(req: Request, res: Response) {
    const {
      name
    } = req.body

    const departamentRepo = getRepository(Departaments)

    const data = {
      name
    }

    const departament = departamentRepo.create(data)
    await departamentRepo.save(departament)
    return res.status(201).json(departament)

  },

 async index(req: Request, res: Response) {
    const departamentRepo = getRepository(Departaments);
    const departament = await departamentRepo.find();
    return res.json(DepartamentsView.renderMany(departament));
  },
}