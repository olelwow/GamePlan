using GamePlan.Api.Db.Models;
using GamePlan.Api.Db;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Runtime.CompilerServices;

namespace GamePlan.Api.Endpoints
{
    public static class ActivityEndpoints
    {
        public static void MapActivityEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapGet("/api/activities/{id}", GetActivityById)
                .WithOpenApi()
                .WithDescription("Get activity by id")
                .WithTags("Activity")
                .WithSummary("Endpoint to get an activity by id");

        }

        static async Task<Activity> GetActivityById(GamePlanContext context, int id)
        {
            var activity = await context.Activities.FindAsync(id);
            if (activity == null)
            {
                throw new Exception($"The activity with id: {id} is not found");
            }

            return activity;
        }
    }
}