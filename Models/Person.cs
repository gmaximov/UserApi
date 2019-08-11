using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UserApiReact.Models
{
    public class Person
    {
        public int Id { get; set; }

        [Required]
        [StringLength(12)]
        public string Inn { get; set; }

        [Required]
        [StringLength(50)]
        public string ShortName { get; set; }

        [Required]
        [StringLength(4000)]
        public string FullName { get; set; }

        [StringLength(200)]
        public string Adress { get; set; }

        [StringLength(200)]
        public string PhoneNumber { get; set; }

        [StringLength(200)]
        public string ChiefFIO { get; set; }

        
        [StringLength(4000)]
        public string Member { get; set; }

        [StringLength(200)]
        public string MemberPhoneNumber { get; set; }

    }
}
