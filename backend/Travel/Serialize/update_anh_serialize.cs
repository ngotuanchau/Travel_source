using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Serialize
{
    public class update_anh_serialize
    {
        [Required]
        public int idtour { get; set; }
        [Required]
        public string tenanh { get; set; }
    }
}
