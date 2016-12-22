using System;
using Microsoft.AspNet.Identity.EntityFramework;
using Task3.Models;
using System.Collections.Generic;

namespace Task3.Models
{
    public class ApplicationUser : IdentityUser
    {
        public virtual ICollection<FileModel> Files { get; set; }
        public ApplicationUser()
        {
            Files = new List<FileModel>();
        }
    }
}