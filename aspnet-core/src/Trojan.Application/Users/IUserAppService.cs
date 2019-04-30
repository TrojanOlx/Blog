using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Trojan.Roles.Dto;
using Trojan.Users.Dto;

namespace Trojan.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}
