using FluentValidation;
using GamePlan.Api.Db.DTOs;

namespace GamePlan.Api.Validators
{
    public class CreateActivityDtoValidator : AbstractValidator<CreateActivityDto>
    {
        public CreateActivityDtoValidator()
        {
            RuleFor(activity => activity.Name)
                .NotEmpty()
                .WithMessage("Activity must have a name.")
                .MaximumLength(25)
                .WithMessage("Activity name can't be longer than 25 characters.")
                .MinimumLength(3)
                .WithMessage("Activity name cannot contain less than 3 characters.");
            RuleFor(activity => activity.Date)
                .NotEmpty()
                .WithMessage("Activity must have a date");
            RuleFor(activity => activity.UserId)
                .NotEmpty()
                .WithMessage("Activity must be connected to a user.");
            RuleFor(activity => activity.Xp)
                .LessThanOrEqualTo(250)
                .WithMessage("Xp value cannot be over 250.")
                .GreaterThanOrEqualTo(0)
                .WithMessage("Xp value cannot be negative.");
        }
    }
}
