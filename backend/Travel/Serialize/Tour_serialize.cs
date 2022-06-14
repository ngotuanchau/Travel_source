using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Serialize
{
    public class Tour_serialize
    {
        public int Id { get; set; }
        public string Tentour { get; set; }
        public int Theloai { get; set; }
        public int Phanvung { get; set; }
        public int Congty { get; set; }
        public int VeToiDa { get; set; }
        public int VeToiThieu { get; set; }
        public int SoNgay { get; set; }
        public int SoDem { get; set; }
        public int DiemDi { get; set; }
        public int DiemDen { get; set; }
        public string Mota { get; set; }
        public string AmThuc { get; set; }
        public string LuuTru { get; set; }
        public string Phuongtien { get; set; }
        public string AnhTour { get; set; }
        public List<NhungNgayKhoiHanh> NhungNgayKhoiHanh { get; set; }
        public List<Nhungdiadiem> Nhungdiadiem { get; set; }
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
        public int Ngay { get; set; }
        public string MoTa { get; set; }
        public string Sang { get; set; }
        public string Trua { get; set; }
        public string Chieu { get; set; }
        public string Toi { get; set; }
    }

    public class Nhungdiadiem
    {
        public int Id { get; set; }
        public int diadiem { get; set; }
        public int Thutu { get; set; }
    }

    public class NhungNgayKhoiHanh
    {
        public int Id { get; set; }
        public DateTime NgayKh { get; set; }
        public decimal GiaNguoiLon { get; set; }
        public decimal GiaTreEn { get; set; }
        public decimal GiaTreNho { get; set; }
    }

}
