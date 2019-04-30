using System.Threading.Tasks;
using Trojan.Configuration.Dto;

namespace Trojan.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
