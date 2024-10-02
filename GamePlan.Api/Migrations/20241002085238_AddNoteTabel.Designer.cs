﻿// <auto-generated />
using System;
using GamePlan.Api.Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GamePlan.Api.Migrations
{
    [DbContext(typeof(GamePlanContext))]
    [Migration("20241002085238_AddNoteTabel")]
    partial class AddNoteTabel
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("GamePlan.Api.Db.Models.Activity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Completed")
                        .HasColumnType("bit");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int?>("Xp")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Activities");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Completed = false,
                            Date = new DateTime(2024, 9, 25, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Gym",
                            UserId = 1,
                            Xp = 6969
                        },
                        new
                        {
                            Id = 2,
                            Completed = false,
                            Date = new DateTime(2024, 9, 26, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Clean bathroom",
                            UserId = 1,
                            Xp = 6969
                        },
                        new
                        {
                            Id = 3,
                            Completed = false,
                            Date = new DateTime(2024, 9, 27, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Study",
                            UserId = 3,
                            Xp = 6969
                        });
                });

            modelBuilder.Entity("GamePlan.Api.Db.Models.Note", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("NoteText")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Note");
                });

            modelBuilder.Entity("GamePlan.Api.Db.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("Level")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Xp")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Level = 0,
                            Password = "1234",
                            UserName = "Jonas69",
                            Xp = 35
                        },
                        new
                        {
                            Id = 2,
                            Level = 3,
                            Password = "9876",
                            UserName = "Rasmus420",
                            Xp = 69
                        },
                        new
                        {
                            Id = 3,
                            Level = 10,
                            Password = "Partille4Life",
                            UserName = "PartilleJohnny",
                            Xp = 200
                        });
                });

            modelBuilder.Entity("GamePlan.Api.Db.Models.Activity", b =>
                {
                    b.HasOne("GamePlan.Api.Db.Models.User", null)
                        .WithMany("Activites")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("GamePlan.Api.Db.Models.Note", b =>
                {
                    b.HasOne("GamePlan.Api.Db.Models.User", null)
                        .WithMany("Notes")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("GamePlan.Api.Db.Models.User", b =>
                {
                    b.Navigation("Activites");

                    b.Navigation("Notes");
                });
#pragma warning restore 612, 618
        }
    }
}
