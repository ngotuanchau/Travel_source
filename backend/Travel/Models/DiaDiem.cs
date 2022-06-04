using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Models
{
    public class DiaDiem
    {
        public int Id { get; set; }
        public int TourId { get; set; }
        public Tour Tour { get; set; }
        public string Ten { get; set; }
        public DateTime NgayTao { get; set; } = DateTime.Now;

        public DateTime NgaySua { get; set; } = DateTime.Now;
        public DateTime? NgayXoa { get; set; }
        public int? TrangThai { get; set; } = 1;

        public List<AnhDd> AnhDds { get; set; }
    }
}
