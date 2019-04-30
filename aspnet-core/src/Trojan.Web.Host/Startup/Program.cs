using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace Trojan.Web.Host.Startup
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseUrls( new string[] { "http://*:21021/"/*, "http://*:4200/"*/ })
                .Build();
        }
    }
}
