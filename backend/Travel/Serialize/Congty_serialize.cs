using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Serialize
{
    public class Congty_serialize
    {
        public int Id { get; set; }
        public string Tencongty { get; set; }
        public string Email { get; set; }
        public string Sdt { get; set; }
        public string KhuVuc { get; set; }
        public string VanPhong { get; set; }
        public string Mst { get; set; }
        public string TheNganHang { get; set; }
        public DateTime NgayTao { get; set; } = DateTime.Now;
        public DateTime NgaySua { get; set; } = DateTime.Now;
        public DateTime? NgayXoa { get; set; }
        public int TrangThai { get; set; } = 1;
    }
}
