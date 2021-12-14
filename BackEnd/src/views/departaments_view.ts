import Departaments from '../models/Departaments'

export default {
  render(departament: Departaments) {
    return {
      id: departament.id,
      name: departament.name,
      created_at: departament.created_at,
      updated_at: departament.updated_at,
    }
  },

  renderMany(departaments: Departaments[]) {
    return departaments.map(departament => this.render(departament))
  }
}