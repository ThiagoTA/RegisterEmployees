import React, { useRef, useCallback, useState, useEffect }  from 'react'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Table } from 'reactstrap';
import api from '../../services/api'

interface EmployeesData {
  id: string;
  name: string;
  email: string;
  telephone: string;
  costcenter: string;
  occupation: string;
  schooling: string;
  departament: string;
  salary: number;
}

interface  EmployeesDataSet {
  id: string;
  name: string;
  email: string;
  telephone: string;
  costcenter: string;
  id_occupation: string;
  id_schooling: string;
  id_departament: string;
}

interface OccupationsData {
  id: string;
  name: string;
  salary: number;
}

interface SchoolingsData {
  id: string;
  name: string;
}
interface DepartamentData {
  id: string;
  name: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [employees, setEmployees] = useState<EmployeesData[]>([])
  const [occupation, setOccupation] = useState<OccupationsData[]>([])
  const [schooling, setSchooling] = useState<SchoolingsData[]>([])
  const [departament, setDepartament] = useState<DepartamentData[]>([])
  const [occupationState, setoccupationState] = useState('')
  const [schoolingState, setschoolingState] = useState('')
  const [departamentState, setdepartamentState] = useState('')


  useEffect(() => {
    api.get('/employees').then(response => {
      setEmployees(response.data)
    })
  }, [])

  useEffect(() => {
    api.get('/occupations').then(response => {
      setOccupation(response.data)
      setoccupationState(response.data[0].id)
    })
  }, [])

  useEffect(() => {
    api.get('/departaments').then(response => {
      setDepartament(response.data)
      setdepartamentState(response.data[0].id)

    })
  }, [])

  useEffect(() => {
    api.get('/schoolings').then(response => {
      setSchooling(response.data)
      setschoolingState(response.data[0].id)

    })
  }, [])

  const handleSubmit = async (data: EmployeesDataSet) => {

    data.id_occupation = occupationState
    data.id_schooling = schoolingState
    data.id_departament = departamentState

    formRef.current?.reset()

    await api.post('/employee', data)
    window.location.reload()
    api.get('/employees').then(async response => {
      setEmployees(response.data)
    })
  }

  const OccupationForm = (data: any) => {
    setoccupationState(data.target.value)
  }
   const SchoolingForm = (data: any) => {
    setschoolingState(data.target.value)
  }
  const DepartamentForm = (data: any) => {
    setdepartamentState(data.target.value)
  }

  return (
    <>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input type='text' name='name' placeholder='Name'  required/>
          <Input type='email' name='email' placeholder='E-mail' required />
          <Input type='text' name='telephone' placeholder='Telephone'  required/>
          <Input type='text' name='costcenter' placeholder='Cost Center'  required/>
          <label>Occupation:
            <select name='occupation' onChange={OccupationForm}>
              {occupation.map(occupation => (
              <option key={occupation.id} value={occupation.id}> {occupation.name}</option>
          ))}
          </select>
          </label>

          <label>Schooling:
          <select name='schooling'onChange={SchoolingForm}>
              {schooling.map(schooling => (
              <option key={schooling.id} value={schooling.id}> {schooling.name}</option>
          ))}
          </select>
          </label>

          <label>Departament:
          <select name='departament'onChange={DepartamentForm}>
              {departament.map(departament => (
              <option key={departament.id} value={departament.id}> {departament.name}</option>
          ))}
          </select>
          </label>
          <Button type='submit'>Save</Button>
        </Form>

      {employees && (
        <>
          <Table size='md' bordered striped className="mt-5">
            <thead>
              <tr>
                <th>Name:</th>
                <th>Email:</th>
                <th>Telephone:</th>
                <th>Cost Center:</th>
                <th>Occupation:</th>
                <th>Schooling:</th>
                <th>Departament:</th>
                <th>Salary:</th>
              </tr>
            </thead>

            {employees.map((employee, id) => (
              <tbody key={id.toString()}>
                <tr>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.telephone}</td>
                  <td>{employee.costcenter}</td>
                  <td>{employee.occupation}</td>
                  <td>{employee.schooling}</td>
                  <td>{employee.departament}</td>
                  <td>{employee.salary}</td>
                  <td className="col-16 text-center">
                    <button type="button" className="btn btn-danger"
                            onClick={(async () => {
                              await api.delete(`/employees/${employee.id}`)
                              api.get('/employees').then(response => {
                                setEmployees(response.data)
                              })
                            })}>Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </>
      )}
    </>
  )
}

export default Dashboard
