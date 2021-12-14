import { Router } from 'express'
import OccupationController from './controllers/OccupationsController'
import SchoolingsController from './controllers/SchoolingsController'
import DepartamentsController from './controllers/DepartamentsController'
import EmployeesController from './controllers/EmployeesController'  

const routes = Router()

routes.post('/occupation', OccupationController.create)
routes.get('/occupations', OccupationController.index)

routes.post('/schooling', SchoolingsController.create)
routes.get('/schoolings', SchoolingsController.index)

routes.post('/departament', DepartamentsController.create)
routes.get('/departaments', DepartamentsController.index)

routes.post('/employee', EmployeesController.create)
routes.get('/employees', EmployeesController.index)
routes.get('/employees/:id', EmployeesController.show)
routes.put('/employees/:id', EmployeesController.update)
routes.delete('/employees/:id', EmployeesController.remove)



export default routes