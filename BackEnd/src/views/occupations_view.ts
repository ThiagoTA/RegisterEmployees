import Occupations from '../models/Occupations'

export default {
  render(occupation: Occupations) {
    return { 
      id: occupation.id,
      name: occupation.name,
      salary: occupation.salary,
      created_at: occupation.created_at,
      updated_at: occupation.updated_at
    }
  },

  renderMany(occupations: Occupations[]) {
    return occupations.map(occupation => this.render(occupation))
  }
}