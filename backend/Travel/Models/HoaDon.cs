using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Models
{
    public class HoaDon
    {
        public int Id { get; set; }
        public int NguoiDungId { get; set; }
        public NguoiDung NguoiDung { get; set; }
        public int TourId { get; set; }
        public Tour Tour { get; set; }
        public int TongSoVeNl { get; set; }
        public int TongSoVeTe { get; set; }
        public int TongTien { get; set; }
        public DateTime NgayTao { get; set; } = DateTime.Now;

        public DateTime NgaySua { get; set; } = DateTime.Now;
        public DateTime? NgayXoa { get; set; }
        public int TrangThai { get; set; } = 1;

    }
}
