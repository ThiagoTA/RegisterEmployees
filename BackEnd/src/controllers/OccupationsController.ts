import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Occupations from '../models/Occupations'
import OccupationsView from '../views/occupations_view'

export default {
  async create(req: Request, res: Response) {
    const {
      name,
      salary
    } = req.body

    const occupationRepo = getRepository(Occupations)

    const data = {
      name,
      salary
    }

    const occupation = occupationRepo.create(data)
    await occupationRepo.save(occupation)
    return res.status(201).json(occupation)

  },

 async index(req: Request, res: Response) {
    const occupationRepo = getRepository(Occupations);
    const occupation = await occupationRepo.find();
    return res.json(OccupationsView.renderMany(occupation));
  },
}