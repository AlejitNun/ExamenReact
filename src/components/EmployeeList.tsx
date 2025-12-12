import type { Employee } from '../types/Employee';

interface EmployeeListProps {
  employees: Employee[];
  handleEdit: (employee: Employee) => void;
  handleDelete: (id?: string) => void;
  loading: boolean;
}

const EmployeeList = ({ employees, handleEdit, handleDelete, loading }: EmployeeListProps) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Listado de Empleados</h2>
      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">DNI</th>
              <th className="border px-4 py-2">Dirección</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} className="text-center">
                <td className="border px-4 py-2">{emp.nombre}</td>
                <td className="border px-4 py-2">{emp.dni}</td>
                <td className="border px-4 py-2">{emp.direccion}</td>
                <td className="border px-4 py-2">{emp.email}</td>
                <td className="border px-4 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(emp)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;

