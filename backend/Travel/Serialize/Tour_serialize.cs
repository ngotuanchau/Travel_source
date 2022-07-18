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
        public string Tentheloai { get; set; }
        [Required]
        public int Phanvung { get; set; }
        public string Tenphanvung { get; set; }
        [Required]
        public int Congty { get; set; }
        public string Tencongty { get; set; }
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
        public string Tendiemdi { get; set; }
        [Required]
        public int DiemDen { get; set; }
        public string Tendiemden { get; set; }
        [Required]
        public string Mota { get; set; }
        [Required]
        public string AmThuc { get; set; }
        [Required]
        public string LuuTru { get; set; }
        [Required]
        public string Phuongtien { get; set; }
        public string Anhtour { get; set; }
     
        [Required]
        public List<NhungNgayKhoiHanh> NhungNgayKhoiHanh { get; set; }
        [Required]
        public List<Nhungdiadiem> Nhungdiadiem { get; set; }
        [Required]
        public List<Lichtrinh> Lichtrinh { get; set; }
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
        public int mode { get; set; }
    }

    public class Nhungdiadiem
    {
        public int Id { get; set; }
        [Required]
        public int diadiem { get; set; }
        public string Tendiadiem { get; set; }
        [Required]
        public int Thutu { get; set; }
        public int mode { get; set; }
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
        public int Vedadat { get; set; }
        public int TrangThai { get; set; }
        public int mode { get; set; }
    }

}
