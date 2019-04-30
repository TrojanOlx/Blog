using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Trojan.MultiTenancy.Dto;

namespace Trojan.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

