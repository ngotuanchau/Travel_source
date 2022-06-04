using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Models
{
    public class CongTy
    {
        public int Id { get; set; }
        public string Tencongty { get; set; }
        [EmailAddress(ErrorMessage = "{0} không hợp lệ")]
        public string Email { get; set; }
        [DataType(DataType.Password)]
        [StringLength(255, MinimumLength = 6, ErrorMessage = "{0} từ 6-20 kí tự")]
        public string MatKhau { get; set; }
        [RegularExpression("0\\d{9}", ErrorMessage = "SĐT không hợp lệ")]
        public string Sdt { get; set; }
        public string KhuVuc { get; set; }
        public string VanPhong { get; set; }
        public string Mst { get; set; }
        public string TheNganHang { get; set; }
        public DateTime NgayTao { get; set; } = DateTime.Now;

        public DateTime NgaySua { get; set; } = DateTime.Now;
        public DateTime? NgayXoa { get; set; }
        public int TrangThai { get; set; } = 1;

        public List<Tour> Tours { get; set; }
        public List<DeXuatTour> DeXuatTours { get; set; }
    }
}
