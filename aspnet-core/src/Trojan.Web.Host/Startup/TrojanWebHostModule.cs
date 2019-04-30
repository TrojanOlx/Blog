using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Trojan.Configuration;

namespace Trojan.Web.Host.Startup
{
    [DependsOn(
       typeof(TrojanWebCoreModule))]
    public class TrojanWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public TrojanWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(TrojanWebHostModule).GetAssembly());
        }
    }
}
