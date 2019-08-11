using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace UserApiReact.Models
{
    public class Permission
    {
        public int Id { get; set; }
        public int PermissionTypeId { get; set; }

        [NotMapped]
        public PermissionType PermissionType
        {
            get
            {
                return this.PermissionTypeId.ToPermissionType();
            }
            set
            {
                PermissionTypeId = (int) value;
            }
        }
    }

}
