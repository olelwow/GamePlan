using GamePlan.Api.Db;
using Microsoft.EntityFrameworkCore;
using GamePlan.Api.Db.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<GamePlanContext>(options =>
options.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=GamePlanDB"));

builder.Services.AddCors(options =>
    options.AddPolicy("AllowAll", policy =>
       policy.AllowAnyOrigin()
       .AllowAnyMethod()
       .AllowAnyHeader()
    ));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAll");
app.UseHttpsRedirection();

app.MapGet("/api/activities", GetAllActivities);

async Task<List<Activity>> GetAllActivities(GamePlanContext db)
{
    return await db.Activities.ToListAsync();
}

app.Run();
