using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialNetworkingApp.Data;
using SocialNetworkingApp.Entities;

namespace SocialNetworkingApp.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            // Always make database call Asynchronous. GuideLine.
            return await _context.Users.ToListAsync();
        }

        [Authorize]
        //api/users/1
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}
