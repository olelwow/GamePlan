using FluentValidation;
using GamePlan.Api.Db.DTOs;

namespace GamePlan.Api.Validators
{
    public class CreateUserDtoValidator : AbstractValidator<CreateUserDto>
    {
        public CreateUserDtoValidator()
        {
            RuleFor(user => user.UserName)
                .NotEmpty()
                .WithMessage("Username required")
                .MaximumLength(30)
                .WithMessage("Username may not exceed 30 characters");

            RuleFor(user => user.Password)
                .NotEmpty()
                .WithMessage("Password required")
                .MinimumLength(4)
                .WithMessage("Password must contain 4 characters minimum");
        }
    }
}
