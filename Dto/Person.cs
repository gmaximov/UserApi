using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UserApiReact.Dto
{
    public class PersonDto
    {
        public int Id { get; set; }

        public string Inn { get; set; }

        public string ShortName { get; set; }

        public string FullName { get; set; }

        public string Adress { get; set; }

        public string PhoneNumber { get; set; }

        public string ChiefFIO { get; set; }

        public string Member { get; set; }

        public string MemberPhoneNumber { get; set; }

    }
}
