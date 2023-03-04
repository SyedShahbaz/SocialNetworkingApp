using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using SocialNetworkingApp.DTOs;
using SocialNetworkingApp.Entities;
using SocialNetworkingApp.Helpers;
using SocialNetworkingApp.Interfaces;

namespace SocialNetworkingApp.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.Include(p => p.Photos).ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            // Here .Include (Eager loading) will cause a circular dependency
            // b/c users have collection of photos and photos has Users...
            // TO SOlVE: Shape the data before returning.. Use DTO.

            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(u => u.UserName == username);
        }

        public async Task<bool> SaveAllAsync()
        {
            // If something has been saved. It will return > 0
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserPrams userPrams)
        {
            // Expression Tree..
            var query = _context.Users
                        .AsQueryable();
            query = query.Where(u => u.UserName != userPrams.CurrentUserName);
            query = query.Where(u => u.Gender == userPrams.Gender);

            var minDob = DateTime.Today.AddYears(-userPrams.MaxAge - 1);
            var maxDob = DateTime.Today.AddYears(-userPrams.MinAge);

            query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            query = userPrams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };

            return await PagedList<MemberDto>.CreateAsync(query.ProjectTo<MemberDto>(_mapper
                .ConfigurationProvider).AsNoTracking(), userPrams.PageNumber, userPrams.PageSize); 
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            // This below thing should be done with the help of autoMapper
            // ProjectTo<MemberDto>(_mapper.ConfigurationProvider)

            // return await _context.Users
            //     .Where(u => u.UserName == username)
            //     .Select(user => new MemberDto
            //     {
            //         Id = user.Id
            //     }).SingleOrDefaultAsync();

            return await _context.Users
                .Where(u => u.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

        }
    }
}
