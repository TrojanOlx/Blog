using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Trojan.Authorization;

namespace Trojan
{
    [DependsOn(
        typeof(TrojanCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class TrojanApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<TrojanAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(TrojanApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );
        }
    }
}
