using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using UserApiReact.Dto;
using UserApiReact.Models;
using UserApiReact.Utils;

namespace UserApiReact.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly UserApiContext _context;

        public UsersController(UserApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(Policy = nameof(PermissionType.UserListView))]
        public async Task<JsonResult> GetUsers()
        {
            var users = await _context.Users.Select(x => x.UserToUserDtoConvert()).ToListAsync();
            return new JsonResult(users);
        }

        [HttpGet("{id}")]
        [Authorize(Policy = nameof(PermissionType.UserView))]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return new JsonResult(user);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = nameof(PermissionType.UserEdit))]
        public async Task<IActionResult> PutUser(int id, [FromBody] UserDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            dto.ApplyChangesToEntity(user);


            await _context.SaveChangesAsync();

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> PostUser(RegisterUserDto dto)
        {
            var duplicateUser = _context.Users.FirstOrDefault(x => x.Login == dto.Login);

            if (duplicateUser != null)
            {
                var response = new
                {
                    message = "Login '" + dto.Login + "' is already taken"
                };
                return BadRequest(response);
            }
            var user = dto.RegisterUserDtoToUserConvert();

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = nameof(PermissionType.UserDelete))]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
