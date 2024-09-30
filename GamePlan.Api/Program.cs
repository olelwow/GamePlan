using GamePlan.Api.Db;
using Microsoft.EntityFrameworkCore;
using GamePlan.Api.Db.Models;
using GamePlan.Api.Endpoints;
using FluentValidation;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new()
    {
        Title = "GamePlan API",
    });
});

builder.Services.AddDbContext<GamePlanContext>(options =>
options.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=GamePlanDB"));

builder.Services.AddValidatorsFromAssemblyContaining<Program>();

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

// Endpoints
app.MapActivityEndpoints();
app.MapUserEndpoints();

app.Run();
