using MediatR;
using Microsoft.EntityFrameworkCore.Update.Internal;
using Persistence;

namespace Application;

public class Delete
{
    public class  Command: IRequest
    {
        public Guid Id {get; set;}
    }

    public class Handler : IRequestHandler<Command>
    {
           private readonly DataContext _Context ;
        public Handler(DataContext context)
        {
            _Context = context;
        }

     

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var Activity = await _Context.Activities.FindAsync(request.Id);
            _Context.Remove(Activity);
            await _Context.SaveChangesAsync();

        }
    }

}
