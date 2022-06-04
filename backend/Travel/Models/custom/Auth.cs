using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Models.custom
{
    public class Auth
    {
        public string message { get; set; }
        public List<NguoiDung> user { get; set; }
        public string token { get; set; }
    }
}
