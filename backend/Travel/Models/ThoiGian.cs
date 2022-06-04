using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Models
{
    public class ThoiGian
    {
        public int Id { get; set; }
        public int TourId { get; set; }
        public Tour Tour { set; get; }
        public DateTime NgayDi { get; set; }
        public int GiaDefaut { get; set; }
        public DateTime NgayVe { get; set; }
        public int SoLuongMax { get; set; }
        public DateTime NgayTao { get; set; } = DateTime.Now;
        public DateTime NgaySua { get; set; } = DateTime.Now;
        public DateTime? NgayXoa { get; set; }
        public int TrangThai { get; set; } = 1;
    }
}
