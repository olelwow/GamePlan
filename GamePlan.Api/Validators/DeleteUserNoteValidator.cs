using FluentValidation;
using GamePlan.Api.Db.DTOs;

namespace GamePlan.Api.Validators
{
    public class DeleteUserNoteValidator
    {
        public class DeleteNoteDtoValidator : AbstractValidator<DeleteUserNoteDto>
        {
            public DeleteNoteDtoValidator()
            {
                RuleFor(x => x.UserId)
                    .GreaterThan(0).WithMessage("User ID must be a positive integer.");

                RuleFor(x => x.NoteId)
                    .GreaterThan(0).WithMessage("Note ID must be a positive integer.");
            }
        }
    }
}
