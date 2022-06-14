﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Models
{
    public class Tour
    {
        public int Id { get; set; }
        public int CongTyId { get; set; }
        public CongTy CongTy { get; set; }
        public int TheLoaiId { get; set; }
        public TheLoai TheLoai { get; set; }
        public int PhanVungId { get; set; }
        public PhanVung PhanVung { get; set; }
        public string TenTour { get; set; }
        public int SoNgay { get; set; }
        public int SoDem { get; set; }
        public int VeDoiDa { get; set; }
        public int VeToiThieu { get; set; }
        public int DiemDi { get; set; }
        public int DiemDen { get; set; }
        public string AmThuc { get; set; }
        public string LuuTru { get; set; }
        public string PhuongTien { get; set; }
        public string MoTa { get; set; }
        public string AnhTour { get; set; }
        public DateTime NgayTao { get; set; } = DateTime.Now;
        public DateTime NgaySua { get; set; } = DateTime.Now;
        public DateTime? NgayXoa { get; set; }
        public int TrangThai { get; set; }
        public List<AnhTour> AnhTours { get; set; }
        //public List<DeXuatTour> DeXuatTours { get; set; }
        public List<HoaDon> HoaDons { get; set; }
        public List<KhuyenMai> KhuyenMais { get; set; }
        public List<LichTrinh> LichTrinhs { get; set; }
        public List<ThoiGian> ThoiGians { get; set; }
        public List<DiaDiem_Tour> DiaDiem_Tours { get; set; }
    }
}
