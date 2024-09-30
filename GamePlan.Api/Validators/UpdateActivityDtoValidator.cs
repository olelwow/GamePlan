using FluentValidation;
using GamePlan.Api.Db.DTOs;

namespace GamePlan.Api.Validators
{
    public class UpdateActivityDtoValidator : AbstractValidator<UpdateActivityDto>
    {
        public UpdateActivityDtoValidator()
        {
            RuleFor(activity => activity.Xp)
                .LessThan(250)
                .WithMessage("XP value too large, must be below 250.")
                .GreaterThanOrEqualTo(0)
                .WithMessage("Xp value cannot be negative.");
            RuleFor(activity => activity.Name)
                .MaximumLength(25)
                .WithMessage("Activity name can't be longer than 25 characters.")
                .MinimumLength(3)
                .WithMessage("Activity name cannot contain less than 3 characters.");
            RuleFor(activity => activity.Date)
                .GreaterThanOrEqualTo(DateTime.Today.AddDays(-1))
                .WithMessage("Date must be set to todays date or a future date.");
        }
    }
}
