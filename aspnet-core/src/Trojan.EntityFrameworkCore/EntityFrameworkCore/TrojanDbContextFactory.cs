using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Trojan.Configuration;
using Trojan.Web;

namespace Trojan.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class TrojanDbContextFactory : IDesignTimeDbContextFactory<TrojanDbContext>
    {
        public TrojanDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<TrojanDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            TrojanDbContextConfigurer.Configure(builder, configuration.GetConnectionString(TrojanConsts.ConnectionStringName));

            return new TrojanDbContext(builder.Options);
        }
    }
}
