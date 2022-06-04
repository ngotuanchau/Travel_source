using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Models;

namespace Travel.Data
{
    public class TravelContext : DbContext
    {
        public TravelContext(DbContextOptions<TravelContext> options)
        : base(options)
        {
        }
        
        public DbSet<AnhDd> AnhDds { get; set; }
        public DbSet<AnhTour> AnhTours { get; set; }
        public DbSet<ChiTietDichVu> ChiTietDichVus { get; set; }
        public DbSet<CongTy> CongTies { get; set; }
        public DbSet<DiaDiem> DiaDiems { get; set; }
        public DbSet<GhiChu> GhiChus { get; set; }
        public DbSet<GiaTreEm> GiaTreEms { get; set; }
        public DbSet<HoaDon> HoaDons { get; set; }
        public DbSet<KhuyenMai> KhuyenMais { get; set; }
        public DbSet<LichTrinh> LichTrinhs { get; set; }
        public DbSet<NguoiDung> NguoiDungs { get; set; }
        public DbSet<TheLoai> TheLoais { get; set; }
        public DbSet<ThoiGian> ThoiGians { get; set; }
        public DbSet<Tour> Tours { get; set; }
        public DbSet<DeXuatTour> DeXuatTours { get; set; }
    }
}
