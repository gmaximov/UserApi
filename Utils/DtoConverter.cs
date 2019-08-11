using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserApiReact.Dto;
using UserApiReact.Models;

namespace UserApiReact.Utils
{
    public static class DtoConverter
    {
        public static UserDto UserToUserDtoConvert(this User user)
        {
            return new UserDto
            {
                Login = user.Login,
                Name = user.Name,
                Id = user.Id
            };
        }
        public static void ApplyChangesToEntity(this UserDto dto, User user)
        {
            user.Name = dto.Name;
        }


        public static User RegisterUserDtoToUserConvert(this RegisterUserDto dto)
        {
            return new User
            {
                Name = dto.Name,
                Login = dto.Login,
                Password = dto.Password
            };
        }
        public static void ApplyChangesToEntity(this PersonDto dto, Person person)
        {
            person.Adress = dto.Adress;
            person.PhoneNumber = dto.PhoneNumber;
            person.ChiefFIO = dto.ChiefFIO;
            person.Member = dto.Member;
            person.MemberPhoneNumber = dto.MemberPhoneNumber;
        }
        public static PersonDto PersonToPersonDtoConvert(this Person person)
        {
            return new PersonDto
            {
                Id = person.Id,
                Inn = person.Inn,
                ShortName = person.ShortName,
                FullName = person.FullName,
                Adress = person.Adress,
                PhoneNumber = person.PhoneNumber,
                ChiefFIO = person.ChiefFIO,
                Member = person.Member,
                MemberPhoneNumber = person.MemberPhoneNumber
            };
        }
        public static Person PersonDtoToPersonConvert(this PersonDto dto)
        {
            return new Person
            {
                Inn = dto.Inn,
                ShortName = dto.ShortName,
                FullName = dto.FullName,
                Adress = dto.Adress,
                PhoneNumber = dto.PhoneNumber,
                ChiefFIO = dto.ChiefFIO,
                Member = dto.Member,
                MemberPhoneNumber = dto.MemberPhoneNumber
            };
        }
    }
}
