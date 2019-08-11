using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UserApiReact.Models
{
    public class User
    {
        public User()
        {
            Role = new Role();
        }
        public int Id { get; set; }

        [Required]
        [StringLength(30)]
        public string Name { get; set; }
        [Required]
        [StringLength(30)]
        public string Login { get; set; }
        [Required]
        [StringLength(30)]
        public string Password { get; set; }

        public Role Role { get; set; }
    }
}
