using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Serialize
{
    public class GetUserDatTour_serialize
    {
        public int id { get; set; }
        public int NguoiDungId { get; set; }
        public int TongSoVeNl { get; set; }
        public int TongSoVeTe { get; set; }
        public decimal TongTien { get; set; }
        public int TrangThai { get; set; }
        public string HoTen { get; set; }
        public string Sdt { get; set; }
        public string email { get; set; }
    }
}
