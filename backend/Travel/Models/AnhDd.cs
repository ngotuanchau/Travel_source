using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Models
{
    public class AnhDd
    {
        public int Id { get; set; }
        public int DiaDiemId { get; set; }
        public DiaDiem DiaDiem { get; set; }
        public string Anh { get; set; }
        public DateTime NgayTao { get; set; } = DateTime.Now;

        public DateTime NgaySua { get; set; } = DateTime.Now;
       
        public DateTime? NgayXoa { get; set; }
        public int TrangThai { get; set; } = 1;


    }
}
