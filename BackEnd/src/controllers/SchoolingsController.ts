import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Schoolings from '../models/Schoolings'
import SchoolingsView from '../views/schoolings_view'

export default {
  async create(req: Request, res: Response) {
    const {
      schooling
    } = req.body

    const schoolingRepo = getRepository(Schoolings)

    const data = {
      schooling
    }

    const schoolings = schoolingRepo.create(data)
    await schoolingRepo.save(schoolings)
    return res.status(201).json(schoolings)

  },

 async index(req: Request, res: Response) {
    const schoolingRepo = getRepository(Schoolings);
    const schooling = await schoolingRepo.find();
    return res.json(SchoolingsView.renderMany(schooling));
  },
}