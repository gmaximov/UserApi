using System;
using System.Collections.Generic;
using System.Linq;

namespace UserApiReact.Models
{
    public enum PermissionType
    {
        UserListView,
        UserView,
        UserEdit,
        UserDelete
    }
    public static class PermissionTypeUtils
    {
        public static PermissionType ToPermissionType(this int typeId)
        {
            return (PermissionType)typeId;
        }

        public static List<string> GetDescriptions()
        {
            return Enum.GetNames(typeof(PermissionType)).ToList();
        }
        public static string GetName(this PermissionType type)
        {
            return type.ToString();
        }
    }
}