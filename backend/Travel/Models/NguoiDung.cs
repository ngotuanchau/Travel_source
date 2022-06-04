using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Models
{
    public class NguoiDung
    {
        
        public int Id { get; set; }
        public string TenNguoiDung { get; set; }
        [EmailAddress(ErrorMessage = "{0} không hợp lệ")]
        public string Email { get; set; }
        [DataType(DataType.Password)]
        [StringLength(255, MinimumLength = 6, ErrorMessage = "{0} từ 6-20 kí tự")]
        public string MatKhau { get; set; }
        public string Avt { get; set; }
        public string Cmnd { get; set; }
        [RegularExpression("0\\d{9}", ErrorMessage = "SĐT không hợp lệ")]
        public string Sdt { get; set; }
        public DateTime NgaySinh { get; set; }
        public string HoTen { get; set; }

        public DateTime NgayTao { get; set; } = DateTime.Now;

        public DateTime NgaySua { get; set; } = DateTime.Now;

        public DateTime? NgayXoa { get; set; }

        public int TrangThai { get; set; } = 1;
        [DefaultValue(true)]
        public bool isAdmin { get; set; }

        public List<HoaDon> HoaDons { get; set; }

    }
}
