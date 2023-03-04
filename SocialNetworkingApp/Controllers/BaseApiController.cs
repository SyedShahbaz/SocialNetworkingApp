using Microsoft.AspNetCore.Mvc;
using SocialNetworkingApp.Helpers;

namespace SocialNetworkingApp.Controllers
{
    //Action Filter for updating last seen.
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
       
    }
}
