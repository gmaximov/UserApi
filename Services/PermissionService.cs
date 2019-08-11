using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using UserApiReact.Models;

namespace UserApiReact.Services
{
    public class PermissionService
    {
        private readonly UserApiContext _context;
        public PermissionService(UserApiContext context)
        {
            _context = context;
        }

        public bool CheckPermissionForUser(ClaimsPrincipal identity, PermissionType permission)
        {
            var idFromIdentity = identity.Claims.FirstOrDefault(x => x.Type == "Id")?.Value;
            if (idFromIdentity == null || !int.TryParse(idFromIdentity, out int Id))
            {
                return false;
            }
            return _context.Users
                .Any(x => x.Id == Id && x.Role.Permissions.Any(y => y.PermissionType == permission));

        }
    }
}
