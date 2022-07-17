using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Serialize
{
    public class search_serialize
    {
        public string diemdi { get; set; }
        public string diemden { get; set; }
        public string thoigiandi { get; set; }
        public string khuvuc { get; set; }
        public string theloai { get; set; }
        public string dichvu { get; set; }
        public string amthuc { get; set; }
        public string phuongtien { get; set; }
        public string luutru { get; set; }

        public search_serialize()
        {
            diemdi = null;
            diemden = null;
            thoigiandi = null;
            khuvuc = null;
            theloai = null;
            dichvu = null;
            amthuc = null;
            phuongtien = null;
            luutru = null;
        }
    }
}