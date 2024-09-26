using GamePlan.Api.Db.Models;
using GamePlan.Api.Db;
using Microsoft.EntityFrameworkCore;
using GamePlan.Api.Db.DTOs;

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

            app.MapGet("/api/activities", GetAllActivities)
                .WithOpenApi()
                .WithDescription("Get all activities")
                .WithTags("Activity")
                .WithSummary("Endpoint to get all activities");

            app.MapPost("/api/activities/", AddActivity)
                .WithOpenApi()
                .WithDescription("Add new activity")
                .WithTags("Activity")
                .WithSummary("Endpoint to add a new activity");

                app.MapPut("/api/activities/{id}", UpdateActivity)
                .WithOpenApi()
                .WithDescription("Update an activity")
                .WithTags("Activity")
                .WithSummary("Endpoint to update an activity");

            app.MapDelete("/api/activities/{id}", DeleteActivity)
                .WithOpenApi()
                .WithDescription("Delete an activity")
                .WithTags("Activity")
                .WithSummary("Endpoint to delete an activity");
        }
        static async Task<IResult> AddActivity(GamePlanContext context, CreateActivityDto activityDto)
        {
            var activity = new Activity
            {
                Name = activityDto.Name,
                Xp = activityDto.Xp,
                Date = activityDto.Date
            };

            context.Activities.Add(activity);
            await context.SaveChangesAsync();
            return Results.Created($"/api/activities/{activity.Id}", activity);
        }

        static async Task<IResult> GetAllActivities(GamePlanContext context)
        {
            var allActivities = await context.Activities.ToListAsync();
            if (allActivities == null || allActivities.Count == 0)
            {
                return Results.NotFound("No activities found");
            }
            return Results.Ok(allActivities);
        }

        static async Task<IResult> GetActivityById(GamePlanContext context, int id)
        {
            var activity = await context.Activities.FindAsync(id);
            if (activity == null)
            {
                return Results.NotFound($"The activity with id: {id} is not found");
            }

            await context.SaveChangesAsync();
            return Results.Ok(activity);
        }

        static async Task<IResult> UpdateActivity(GamePlanContext context, int id, Activity updatedActivity)
        {
            var activity = await context.Activities.FindAsync(id);
            if (activity == null)
            {
                return Results.NotFound($"The activity with id: {id} is not found");
            }
            activity.Name = updatedActivity.Name;
            activity.Xp = updatedActivity.Xp;
            activity.Date = updatedActivity.Date;
            
            context.Activities.Update(activity);
            await context.SaveChangesAsync();
            return Results.Ok(activity);
        }

        static async Task<IResult> DeleteActivity(GamePlanContext context, int id)
        {
            var activity = await context.Activities.FindAsync(id);
            if (activity == null)
            {
                return Results.NotFound($"The activity with id: {id} is not found");
            }
            context.Activities.Remove(activity);
            await context.SaveChangesAsync();
            return Results.Ok(activity);
        }
    }
}