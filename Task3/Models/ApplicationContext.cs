using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace Task3.Models
{
    public class ApplicationContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationContext() : base("IdentityDb") { }
        public static ApplicationContext Create()
        {
            return new ApplicationContext();
        }
    }
}