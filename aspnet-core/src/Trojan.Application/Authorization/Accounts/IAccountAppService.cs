using System.Threading.Tasks;
using Abp.Application.Services;
using Trojan.Authorization.Accounts.Dto;

namespace Trojan.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
