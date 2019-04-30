using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Trojan.Authorization.Roles;
using Trojan.Authorization.Users;
using Trojan.MultiTenancy;
using Trojan.Blog;

namespace Trojan.EntityFrameworkCore
{
    public class TrojanDbContext : AbpZeroDbContext<Tenant, Role, User, TrojanDbContext>
    {
        /* Define a DbSet for each entity of the application */

        public TrojanDbContext(DbContextOptions<TrojanDbContext> options)
            : base(options)
        {

        }

        public DbSet<Note> Notes { get; set; }
        public DbSet<NoteBook> NotesBooks { get; set; }
        public DbSet<NoteToNoteBook> NoteToNoteBooks { get; set; }

    }
}
