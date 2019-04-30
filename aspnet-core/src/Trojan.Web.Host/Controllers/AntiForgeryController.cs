using Microsoft.AspNetCore.Antiforgery;
using Trojan.Controllers;

namespace Trojan.Web.Host.Controllers
{
    public class AntiForgeryController : TrojanControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
