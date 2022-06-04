using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Models.custom
{

    public class getTours
    {
        public int id { get; set; }
        public int congTyId { get; set; }
        public string TencongTy { get; set; }
        public int theLoaiId { get; set; }
        public string Tenloai { get; set; }
        public string tenTour { get; set; }
        public string moTa { get; set; }
        public string canChuanBi { get; set; }
        public string diemNoiBat { get; set; }
        public string diemDi { get; set; }
        public DateTime ngayTao { get; set; }
        public int trangThai { get; set; }
        public string anhTours { get; set; }
        public int Gia { get; set; }
    }
}
