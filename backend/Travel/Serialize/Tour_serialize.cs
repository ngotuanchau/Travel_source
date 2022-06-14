using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Serialize
{
    public class Tour_serialize
    {
        public int Id { get; set; }
        [Required]
        public string Tentour { get; set; }
        [Required]
        public int Theloai { get; set; }
        [Required]
        public int Phanvung { get; set; }
        [Required]
        public int Congty { get; set; }
        [Required]
        public int VeToiDa { get; set; }
        [Required]
        public int VeToiThieu { get; set; }
        [Required]
        public int SoNgay { get; set; }
        [Required]
        public int SoDem { get; set; }
        [Required]
        public int DiemDi { get; set; }
        [Required]
        public int DiemDen { get; set; }
        [Required]
        public string Mota { get; set; }
        [Required]
        public string AmThuc { get; set; }
        [Required]
        public string LuuTru { get; set; }
        [Required]
        public string Phuongtien { get; set; }
        [Required]
        public string AnhTour { get; set; }
        [Required]
        public List<NhungNgayKhoiHanh> NhungNgayKhoiHanh { get; set; }
        [Required]
        public List<Nhungdiadiem> Nhungdiadiem { get; set; }
        [Required]
        public List<Lichtrinh> Lichtrinh { get; set; }
        [Required]
        public List<Hinhanh> Hinhanh { get; set; }
    }

    public class Hinhanh
    {
        public int Id { get; set; }
        public string tenanh { get; set; }
    }

    public class Lichtrinh
    {
        public int Id { get; set; }
        [Required]
        public int Ngay { get; set; }
        [Required]
        public string MoTa { get; set; }
        [Required]
        public string Sang { get; set; }
        [Required]
        public string Trua { get; set; }
        [Required]
        public string Chieu { get; set; }
        [Required]
        public string Toi { get; set; }
    }

    public class Nhungdiadiem
    {
        public int Id { get; set; }
        [Required]
        public int diadiem { get; set; }
        [Required]
        public int Thutu { get; set; }
    }

    public class NhungNgayKhoiHanh
    {
        public int Id { get; set; }
        [Required]
        public string NgayKh { get; set; }
        [Required]
        public decimal GiaNguoiLon { get; set; }
        [Required]
        public decimal GiaTreEn { get; set; }
        [Required]
        public decimal GiaTreNho { get; set; }
    }

}
