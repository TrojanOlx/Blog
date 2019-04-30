using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using Trojan.Configuration.Dto;

namespace Trojan.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : TrojanAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
