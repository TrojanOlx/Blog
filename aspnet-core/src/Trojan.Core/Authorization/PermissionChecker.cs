using Abp.Authorization;
using Trojan.Authorization.Roles;
using Trojan.Authorization.Users;

namespace Trojan.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
