import type { Employee } from '../types/Employee';

interface EmployeeFormProps {
  formData: Employee;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  employeeToEdit: Employee | null;
  setEmployeeToEdit: React.Dispatch<React.SetStateAction<Employee | null>>;
  setFormData: React.Dispatch<React.SetStateAction<Employee>>;
}

const EmployeeForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  loading,
  employeeToEdit,
  setEmployeeToEdit,
  setFormData,
}: EmployeeFormProps) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {employeeToEdit ? 'Editar Empleado' : 'Agregar Empleado'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['nombre', 'dni', 'direccion', 'email'].map(field => (
          <div key={field}>
            <label className="block text-gray-700 font-medium mb-1 capitalize">{field}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field as keyof Employee]}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        <div className="flex justify-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {loading ? 'Cargando...' : employeeToEdit ? 'Actualizar' : 'Agregar'}
          </button>

          {employeeToEdit && (
            <button
              type="button"
              onClick={() => {
                setEmployeeToEdit(null);
                setFormData({ nombre: '', dni: '', direccion: '', email: '' });
              }}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;

