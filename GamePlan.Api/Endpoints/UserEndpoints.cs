using System.Runtime.CompilerServices;
using GamePlan.Api.Db.Models;
using GamePlan.Api.Db;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using GamePlan.Api.Db.DTOs;
using Microsoft.AspNetCore.Mvc;
using FluentValidation;

namespace GamePlan.Api.Endpoints
{
    public static class UserEndpoints
    {
        private const string _tagUser = "User";
        private const string _tagActivities = "Activities";
        public static void MapUserEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapPost("/api/users", AddUser)
                .WithOpenApi()
                .WithDescription("Add a new user")
                .WithTags(_tagUser)
                .WithSummary("Endpoint to add new user");

            app.MapGet("/api/users/{id}", GetUserById)
                .WithOpenApi()
                .WithDescription("Get user by id")
                .WithTags(_tagUser)
                .WithSummary("Endpoint to get a user by id");

            app.MapGet("api/users/", GetAllUsers)
                .WithOpenApi()
                .WithDescription("Get all users")
                .WithTags(_tagUser)
                .WithSummary("Endpoint to get all users");

            app.MapPut("/api/users/{id}", UpdateUserXpById)
                .WithOpenApi()
                .WithDescription("Update xp for user by id")
                .WithTags(_tagUser)
                .WithSummary("Endpoint to update the xp value for the user with the specified id");

            app.MapPut("/api/users/{id}/notes", UpdateUserNote)
                .WithOpenApi()
                .WithDescription("Update user-note for user by id")
                .WithTags(_tagUser)
                .WithSummary("Endpoint to update user note to the database.");

            app.MapDelete("/api/users/{id}", DeleteUserById)
                .WithOpenApi()
                .WithDescription("Delete user by id")
                .WithTags(_tagUser)
                .WithSummary("Endpoint to delete the specified user from the database.");
        }

        private static async Task<IResult> UpdateUserNote(GamePlanContext context, int id, UpdateUserNoteDto updateUserNoteDto, IValidator<UpdateUserNoteDto> validator)
        {
            var validationResult = await validator.ValidateAsync(updateUserNoteDto);
            if (!validationResult.IsValid)
            {
                return Results.BadRequest(validationResult.Errors);
            }

            var currentUser = await context.Users.FindAsync(id);
            if (currentUser == null)
            {
                return Results.NotFound($"User with id {id} not found");
            }

            currentUser.Notes = updateUserNoteDto.Notes;

            await context.SaveChangesAsync();
            return Results.Ok(currentUser);
        }

            private static async Task<IResult> UpdateUserXpById(GamePlanContext context, int id, UpdateUserXpDto userDto)
            {
            var currentUser = await context.Users.FindAsync(id);
            if (currentUser == null)
            {
                return Results.NotFound(UserNotFound(id));
            }
                
            currentUser.Xp += userDto.Xp;

            if (currentUser.Xp >= 200) 
            { 
                currentUser.Level++;
                currentUser.Xp -= 200;
            };

            await context.SaveChangesAsync();
            return Results.Ok(currentUser);
        }

        private static async Task<IResult> DeleteUserById(GamePlanContext context, int id)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null)
            {
                return Results.NotFound(UserNotFound(id));
            }
            context.Remove(user);
            await context.SaveChangesAsync();

            return Results.Ok(user);
        }

        static async Task<IResult> GetUserById(GamePlanContext context, int id)
        {
            var user = await context.Users
                .Include(user => user.Activites)
                .FirstOrDefaultAsync(user => user.Id == id);
            if (user == null)
            {
                return Results.NotFound(UserNotFound(id));
            }
            return Results.Ok(user);
        }

        static async Task<IResult> GetAllUsers(GamePlanContext context)
        {
            var allUsers = await context.Users
                .Include(user => user.Activites)
                .ToListAsync();
            if (allUsers == null || allUsers.Count == 0)
            {
                return Results.NotFound($"There are no users in the database");
            }
            return Results.Ok(allUsers);
        }

        static async Task<IResult> AddUser(GamePlanContext context, CreateUserDto userDto, IValidator<CreateUserDto> validator)
        {
            var validationResult = await validator.ValidateAsync(userDto);
            if (!validationResult.IsValid)
            {
                return Results.BadRequest(validationResult.Errors);
            }

            var user = new User
            {
                UserName = userDto.UserName,
                Password = userDto.Password,
                Xp = 0,
                Level = 1
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();
            return Results.Created($"/api/users/{user.Id}", user);
        }

        static string UserNotFound (int id)
        {
            return $"The user with id: {id} was not found";
        }
    }
}
