using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Models
{
    public class DeXuatTour
    {
        public int Id { get; set; }
        public int NguoiDungId { get; set; }
        public NguoiDung NguoiDung { get; set; }
        //public int TourId { get; set; }
        //public Tour Tour { get; set; }
        public int CongTyId { get; set; }
        public CongTy CongTy { get; set; }
        public DateTime NgayTao { get; set; } = DateTime.Now;

        public DateTime NgaySua { get; set; } = DateTime.Now;
        public DateTime? NgayXoa { get; set; }
        public int TrangThai { get; set; }

    }
}
