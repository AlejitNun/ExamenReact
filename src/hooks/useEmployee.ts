import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import type { Employee } from '../types/Employee';

const API_URL = 'https://674c84c054e1fca9290cd05f.mockapi.io/api/examen/empleado';

const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState<Employee>({
    nombre: '',
    dni: '',
    direccion: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Employee[]>(API_URL);
      setEmployees(response.data);
    } catch (err) {
      Swal.fire('Error', 'No se pudieron cargar los empleados', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validaciones
    if (!formData.nombre || !formData.dni || !formData.direccion || !formData.email) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Swal.fire('Error', 'El email no es válido', 'error');
      return;
    }

    setLoading(true);
    try {
      if (employeeToEdit && employeeToEdit.id) {
        // Actualizar
        await axios.put(`${API_URL}/${employeeToEdit.id}`, formData);
        Swal.fire('Éxito', 'Empleado actualizado correctamente', 'success');
      } else {
        // Crear
        await axios.post(API_URL, formData);
        Swal.fire('Éxito', 'Empleado agregado correctamente', 'success');
      }
      setFormData({ nombre: '', dni: '', direccion: '', email: '' });
      setEmployeeToEdit(null);
      await fetchEmployees();
    } catch (err) {
      Swal.fire('Error', 'No se pudo guardar el empleado', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEmployeeToEdit(employee);
    setFormData(employee);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        Swal.fire('Eliminado', 'Empleado eliminado correctamente', 'success');
        await fetchEmployees();
      } catch (err) {
        Swal.fire('Error', 'No se pudo eliminar el empleado', 'error');
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    formData,
    setFormData,
    loading,
    employeeToEdit,
    setEmployeeToEdit,
    handleInputChange,
    handleSubmit,
    handleEdit,
    handleDelete,
  };
};

export default useEmployees;

