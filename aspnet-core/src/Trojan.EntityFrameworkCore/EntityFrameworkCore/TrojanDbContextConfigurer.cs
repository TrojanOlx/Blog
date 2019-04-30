using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Trojan.EntityFrameworkCore
{
    public static class TrojanDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<TrojanDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<TrojanDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
