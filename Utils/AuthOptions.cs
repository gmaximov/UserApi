using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace UserApiReact.Utils
{
    public class AuthOptions
    {
        public const string ISSUER = "UserApiReact";
        public const string AUDIENCE = "https://localhost:44395/";
        const string KEY = "4be67355-e3d1-4580-b777-3cffe1991d3c";   // ключ для шифрованияии
        public const int LIFETIME = 1440; // время жизни токена - 1 день
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
