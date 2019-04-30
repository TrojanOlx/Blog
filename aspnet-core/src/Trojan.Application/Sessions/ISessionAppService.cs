using System.Threading.Tasks;
using Abp.Application.Services;
using Trojan.Sessions.Dto;

namespace Trojan.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
