using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Serialize
{
    public class Tour_serialize
    {
        public string Tentour { get; set; }
        public int Theloai { get; set; }
        public int Phanvung { get; set; }
        public int Congty { get; set; }
        public string Mota { get; set; }
        public string Anuong { get; set; }
        public string NoiO { get; set; }
        public string Phuongtien { get; set; }
        public List<CheDoTreEm> CheDoTreEm { get; set; }
        public List<NhungNgayKhoiHanh> NhungNgayKhoiHanh { get; set; }
        public List<Nhungdiadiem> Nhungdiadiem { get; set; }
        public List<Lichtrinh> Lichtrinh { get; set; }
        public List<Hinhanh> Hinhanh { get; set; }
    }
    public class CheDoTreEm
    {
        public int Dotuoi { get; set; }
        public decimal Gia { get; set; }
    }

    public class Hinhanh
    {
        public string tenanh { get; set; }
    }

    public class Lichtrinh
    {
        public int Ngay { get; set; }
        public string Sang { get; set; }
        public string Trua { get; set; }
        public string Toi { get; set; }
    }

    public class Nhungdiadiem
    {
        public int diadiem { get; set; }
        public int Thutu { get; set; }
    }

    public class NhungNgayKhoiHanh
    {
        public string NgayKh { get; set; }
        public string NgayVe { get; set; }
        public decimal Gia { get; set; }
        public int SLMax { get; set; }
        public int SLDat { get; set; }
    }

}
