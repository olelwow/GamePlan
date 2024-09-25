using System.Runtime.CompilerServices;
using GamePlan.Api.Db.Models;
using GamePlan.Api.Db;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace GamePlan.Api.Endpoints
{
    public static class UserEndpoints
    {
        private const string _tagUser = "User";
        private const string _tagActivities = "Activities";
        public static void MapUserEndpoints(this IEndpointRouteBuilder app)
        {


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

        }

        static async Task<User> GetUserById(GamePlanContext context, int id)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null)
            {
                throw new Exception($"The user with id: {id} is not found");
            }

            return user;
        }


        static async Task<List<User>> GetAllUsers(GamePlanContext context)
        {
            var allUsers = await context.Users.ToListAsync();
            if (allUsers == null || allUsers.Count == 0)
            {
                throw new Exception($"There are no users in the database");
            }
            return allUsers;
        }

    }
}
