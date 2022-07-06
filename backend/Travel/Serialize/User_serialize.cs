using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Serialize
{
    public class User_serialize
    {
        public int Id { get; set; }
        public string TenNguoiDung { get; set; }
        public string Email { get; set; }
        public string Avt { get; set; }
        public string Cmnd { get; set; }
        public string Sdt { get; set; }
        public DateTime NgaySinh { get; set; }
        public string HoTen { get; set; }
        public int TrangThai { get; set; } = 1;
        public bool isAdmin { get; set; }

    }
}
