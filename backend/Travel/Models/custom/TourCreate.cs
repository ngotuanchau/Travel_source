using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Models.custom
{
    public class TourCreate
    {
        public rTour rTour { get; set; }
        public List<rDiaDiem> rDiaDiem { get; set; }
        public List<rThoiGian> rThoiGians { get; set; }
        public rLichTrinh rLichTrinh { get; set; }
        public rChiTietDichVu rChiTietDichVu { get; set; }
        public List<rGhiChu> rGhiChus { get; set; }
        public List<rAnhTour> rAnhTour { get; set; }
        public List<RAnhdds> RAnhdds { get; set; }
    }
    public class rAnhTour
    {
        public string Anh { get; set; }
    }
    public class rChiTietDichVu
    {
        public string CoTrongVe { get; set; }
        public string KhongTrongVe { get; set; }
        public string CheDoTreEm { get; set; }
    }

    public class rDiaDiem
    {
        public string Ten { get; set; }
    }

    public class rGhiChu
    {
        public string TieuDe { get; set; }
        public string NoiDung { get; set; }
    }

    public class rLichTrinh
    {
        public string Sang { get; set; }
        public string Trua { get; set; }
        public string Chieu { get; set; }
    }

    public class rThoiGian
    {
        public string NgayDi { get; set; }
        public int GiaMacDinh { get; set; }
        public string NgayVe { get; set; }
        public int SoLuongToiDa { get; set; }
    }

    public class rTour
    {
        public int TheLoaiId { get; set; }
        public int CongtyId { get; set; }
        public string TenTour { get; set; }
        public string Mota { get; set; }
        public string DiemDi { get; set; }
        public List<string> CanChuanBi { get; set; }
        public List<string> DiemNoiBat { get; set; }
    }
    public class RAnhdds
    {
        public int DiaDiemId { get; set; }
        public string Anh { get; set; }

    }
}
