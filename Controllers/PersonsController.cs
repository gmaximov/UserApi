using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserApiReact.Dto;
using UserApiReact.Models;
using UserApiReact.Utils;

namespace UserApiReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonsController : Controller
    {
        private readonly UserApiContext _context;

        public PersonsController(UserApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetPerson()
        {
            var persons = await _context.Persons.Select(x => x.PersonToPersonDtoConvert()).ToListAsync();
            return new JsonResult(persons);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(int id)
        {
            var person = await _context.Persons.FindAsync(id);

            if (person == null)
            {
                return NotFound();
            }

            return new JsonResult(person);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerson(int id, [FromBody] PersonDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }
            var person = _context.Persons.FirstOrDefault(e => e.Id == id);

            if (person == null)
            {
                return NotFound();
            }

            dto.ApplyChangesToEntity(person);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<Person>> PostPerson(PersonDto dto)
        {
            var duplicatePerson = _context.Persons.FirstOrDefault(x => x.FullName == dto.FullName && x.Inn == dto.Inn && x.ShortName == dto.ShortName);
            if (duplicatePerson != null)
            {
                var response = new
                {
                    message = "These Inn, Full name and Short name are already taken"
                };
                return BadRequest(response);
            }
            var person = dto.PersonDtoToPersonConvert();
            _context.Persons.Add(person);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPerson", new { id = person.Id }, person);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePerson(int id)
        {
            var person = await _context.Persons.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            _context.Persons.Remove(person);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
