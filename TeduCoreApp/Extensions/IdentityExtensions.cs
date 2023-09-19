using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace TeduCoreApp.Extensions
{
    public static class IdentityExtensions
    {
        public static string GetSpecificClaim(this ClaimsPrincipal claimsPrincipal,string ClaimsType)
        {
            var claim = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimsType);
            return (claim != null) ? claim.Value : string.Empty;
        }
    }
}
