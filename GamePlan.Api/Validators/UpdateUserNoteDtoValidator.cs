using FluentValidation;
using GamePlan.Api.Db.DTOs;

namespace GamePlan.Api.Validators
{
    public class UpdateUserNoteDtoValidator : AbstractValidator<UpdateUserNoteDto>
    {
        public UpdateUserNoteDtoValidator() 
        {
            RuleFor(n => n.Notes)
                .NotNull()
                .WithMessage("Notes cannot be null");

            RuleForEach(n => n.Notes).ChildRules(notes =>
            {
                notes.RuleFor(note => note)
                .NotEmpty().WithMessage("Note cannot be empty")
                .MaximumLength(30)
                .WithMessage("Note cannot exceed 30 characters")
                .Matches(@"^[a-zA-Z0-9\s,.!?åäöÅÄÖ-]*$")
                .WithMessage("Note contains invalid characters");
            });
        }
    }
}
