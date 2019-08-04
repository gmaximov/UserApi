using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserApiReact.Models
{
    public class RegisterUserDto
    {
        public string Name { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }

        internal User ToModel()
        {
            return new User
            {
                Name = Name,
                Login = Login,
                Password = Password
            };
        }
    }
}
