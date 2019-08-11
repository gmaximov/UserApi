using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserApiReact.Models
{
    public class Role
    {
        public Role()
        {
            Permissions = new List<Permission>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Permission> Permissions { get; set; }
    }
}
