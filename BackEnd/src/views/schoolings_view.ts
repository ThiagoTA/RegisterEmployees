import Schoolings from '../models/Schoolings'

export default {
  render(schooling: Schoolings) {
    return { 
      id: schooling.id,
      name: schooling.schooling,
      created_at: schooling.created_at,
      updated_at: schooling.updated_at,
    }
  },

  renderMany(schoolings: Schoolings[]) {
    return schoolings.map(schooling => this.render(schooling))
  }
 }