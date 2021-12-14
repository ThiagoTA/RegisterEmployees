import Employees from '../models/Employees'

export default {
  render(employee: Employees) {
    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      costcenter: employee.costcenter,
      telephone: employee.telephone,
      id_occupation: employee.id_occupation,
      id_schooling: employee.id_schooling,
      id_departament: employee.id_departament,
      created_at: employee.created_at,
      updated_at: employee.updated_at,
    }
  },

  renderMany(employees: Employees[]) {
    return employees.map(employee => this.render(employee))
  }
}