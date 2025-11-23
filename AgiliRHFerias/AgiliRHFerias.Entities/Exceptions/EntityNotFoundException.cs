using System;

namespace AgiliRHFerias.Entities.Exceptions
{
    public class EntityNotFoundException : NotFoundException
    {
        public EntityNotFoundException()
            : base($"The entity doesn't exist in the database.")
        {
        }

        public EntityNotFoundException(Guid id)
            : base($"The entity with id: {id} doesn't exist in the database.")
        {
        }
    }
}
