﻿using GamePlan.Api.Db.Models;
using Microsoft.EntityFrameworkCore;

namespace GamePlan.Api.Db
{
    public class GamePlanContext : DbContext
    {
        public GamePlanContext(DbContextOptions option) : base(option)
        {
           
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Activity> Activities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User {Id = 1, UserName = "Jonas69", Password = "1234", Level = 0, Xp = 35 },
                new User {Id = 2, UserName = "Rasmus420", Password = "9876", Level = 3, Xp = 69 },
                new User {Id = 3, UserName = "PartilleJohnny", Password = "Partille4Life", Level = 10, Xp = 200}
            );
            modelBuilder.Entity<Activity>().HasData(
                 new Activity { Id = 1, Name = "Gym", Xp = 6969, Completed = false, Date = new DateTime(2024, 9, 25), UserId = 1 },
                 new Activity { Id = 2, Name = "Clean bathroom", Xp = 6969, Completed = false, Date = new DateTime(2024, 9, 26), UserId = 1 },
                 new Activity { Id = 3, Name = "Study", Xp = 6969, Completed = false, Date = new DateTime(2024, 9, 27), UserId = 3 }
            );
        }
    }
}
