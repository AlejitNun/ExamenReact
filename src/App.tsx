import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import useEmployees from './hooks/useEmployee';

function App() {
  const {
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
  } = useEmployees();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Gestión de Empleados</h1>
      <EmployeeForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        loading={loading}
        employeeToEdit={employeeToEdit}
        setEmployeeToEdit={setEmployeeToEdit}
        setFormData={setFormData}
      />
      <EmployeeList
        employees={employees}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
}

export default App;

