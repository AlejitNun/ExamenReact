import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import useEmployees from "../hooks/useEmployee";

const GestorEmpleados = () => {
  const { employees, formData, loading, handleInputChange, handleSubmit } = useEmployees();

  return (
    <div className="container mx-auto max-w-3xl p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Gestión de Empleados</h1>
      <EmployeeForm
        formData={formData}
        loading={loading}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <EmployeeList employees={employees} />
    </div>
  );
};

export default GestorEmpleados;
