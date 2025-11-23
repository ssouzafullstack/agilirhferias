using System;

namespace AgiliRHFerias.Entities.Exceptions
{
    public class EmployeeNotFoundException : NotFoundException
    {
        public EmployeeNotFoundException(Guid id)
            : base($"Employee with id: {id} doesn't exist in the database.")
        { }
    }
}
