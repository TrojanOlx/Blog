using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace Trojan.Controllers
{
    public abstract class TrojanControllerBase: AbpController
    {
        protected TrojanControllerBase()
        {
            LocalizationSourceName = TrojanConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
