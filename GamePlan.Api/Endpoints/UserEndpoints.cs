using System.Runtime.CompilerServices;
using GamePlan.Api.Db.Models;
using GamePlan.Api.Db;
using Microsoft.AspNetCore.Http.HttpResults;

namespace GamePlan.Api.Endpoints
{
    public static class UserEndpoints
    {
        public static void MapUserEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapGet("/api/users/{id}", GetUserById)
                .WithOpenApi()
                .WithDescription("Get user by id")
                .WithTags("User")
                .WithSummary("Endpoint to get a user by id");

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
    }
}
