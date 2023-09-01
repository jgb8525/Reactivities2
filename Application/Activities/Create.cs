using Domain;
using MediatR;
using Persistence;

namespace Application;

public class Create
{
    public class Command:IRequest
    {
        public Activity Activity { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        public Handler(DataContext context)
        {
            _context = context;
        }

        private readonly DataContext _context;

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            _context.Activities.Add(request.Activity);
            await _context.SaveChangesAsync();
        }
    }

}
