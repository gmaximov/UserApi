﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using UserApiReact.Models;

namespace UserApiReact.Migrations
{
    [DbContext(typeof(UserApiContext))]
    [Migration("20190811173135_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("UserApiReact.Models.Permission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("PermissionTypeId");

                    b.Property<int?>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Permissions");
                });

            modelBuilder.Entity("UserApiReact.Models.Person", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Adress")
                        .HasMaxLength(200);

                    b.Property<string>("ChiefFIO")
                        .HasMaxLength(200);

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(4000);

                    b.Property<string>("Inn")
                        .IsRequired()
                        .HasMaxLength(12);

                    b.Property<string>("Member")
                        .HasMaxLength(4000);

                    b.Property<string>("MemberPhoneNumber")
                        .HasMaxLength(200);

                    b.Property<string>("PhoneNumber")
                        .HasMaxLength(200);

                    b.Property<string>("ShortName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("ShortName", "Inn", "FullName")
                        .IsUnique();

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("UserApiReact.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("UserApiReact.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<int?>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("Login")
                        .IsUnique();

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("UserApiReact.Models.Permission", b =>
                {
                    b.HasOne("UserApiReact.Models.Role")
                        .WithMany("Permissions")
                        .HasForeignKey("RoleId");
                });

            modelBuilder.Entity("UserApiReact.Models.User", b =>
                {
                    b.HasOne("UserApiReact.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId");
                });
#pragma warning restore 612, 618
        }
    }
}
