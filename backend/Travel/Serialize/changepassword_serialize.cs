using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Serialize
{
    public class changepassword_serialize
    {
        [Required]
        [StringLength(255, MinimumLength = 6, ErrorMessage = "{0} từ 6-20 kí tự")]
        public string passwordold { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 6, ErrorMessage = "{0} từ 6-20 kí tự")]
        public string passwordnew { get; set; }
    }
}
