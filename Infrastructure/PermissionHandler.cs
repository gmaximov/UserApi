using Microsoft.AspNetCore.Authorization;
using System;
using System.Threading.Tasks;
using UserApiReact.Models;
using UserApiReact.Services;

namespace UserApiReact.Infrastructure
{
    public class PermissionHandler : AuthorizationHandler<PermissionRequirement>
    {
        private readonly PermissionService permissionService;

        public PermissionHandler(PermissionService permissionService)
        {
            if (permissionService == null)
                throw new ArgumentNullException(nameof(permissionService));

            this.permissionService = permissionService;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            if (context.User != null)
            {
                bool hasPermission = permissionService.CheckPermissionForUser(context.User, requirement.Permission);
                if (hasPermission)
                {
                    context.Succeed(requirement);
                    return Task.CompletedTask;
                }
            }
            context.Fail();
            return Task.CompletedTask;
        }
    }
    public class PermissionRequirement : IAuthorizationRequirement
    {
        public PermissionRequirement(PermissionType permission)
        {
            Permission = permission;
        }

        public PermissionType Permission { get; }
    }
}
