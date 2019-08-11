using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using UserApiReact.Models;

namespace UserApiReact.Utils
{
    public static class DbInitializer
    {
        public static void Seed(UserApiContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                return;   
            }

            var permissions = Enum.GetValues(typeof(PermissionType))
                .Cast<PermissionType>()
                .Select(x => new Permission { PermissionType = x })
                .ToList();

            var user = new User
            {
                Login = "admin",
                Password = "admin",
                Name = "admin",
                Role = new Role { Name = "Admin", Permissions = permissions }
            };

            context.Users.Add(user);

            context.SaveChanges();
        }
    }
}
