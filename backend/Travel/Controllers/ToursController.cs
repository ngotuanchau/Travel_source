using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Data;
using Travel.Models;
using Travel.Serialize;
using Microsoft.EntityFrameworkCore;

namespace Travel.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ToursController : Controller
    {
        public IConfiguration _configuration;
        private readonly TravelContext _context;
        public ToursController(IConfiguration configuration, TravelContext context)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "Business")]
        [ActionName("createTour")]
        public async Task<IActionResult> createTour([FromBody] Tour_serialize tour_Serialize)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                // Insert table Tour
                var tour = new Tour();
                tour.CongTyId = tour_Serialize.Congty;
                tour.TheLoaiId = tour_Serialize.Theloai;
                tour.PhanVungId = tour_Serialize.Phanvung;
                tour.TenTour = tour_Serialize.Tentour;
                tour.AnUong = tour_Serialize.Anuong;
                tour.NoiO = tour_Serialize.NoiO;
                tour.PhuongTien = tour_Serialize.Phuongtien;
                tour.MoTa = tour_Serialize.Mota;
                tour.TrangThai = 1;
        
                _context.Tours.Add(tour);
                _context.SaveChanges();
                int idtour = tour.Id;

                //Insert table DiaDiem_Tour
                foreach (var dd in tour_Serialize.Nhungdiadiem)
                {
                    var diadiem_tour = new DiaDiem_Tour();
                    diadiem_tour.TourId = idtour;
                    diadiem_tour.ThuTu = dd.Thutu;
                    diadiem_tour.DiaDiemId = dd.diadiem;
                    _context.Add(diadiem_tour);
                    _context.SaveChanges();
                }

                //insert table ThoiGian
                foreach (var tt in tour_Serialize.NhungNgayKhoiHanh)
                {
                    var thoigian = new ThoiGian();
                    DateTime ngaykhoihanh = DateTime.ParseExact(tt.NgayKh, "dd/MM/yyyy",
                                System.Globalization.CultureInfo.InvariantCulture);
                    DateTime ngayve = DateTime.ParseExact(tt.NgayVe, "dd/MM/yyyy",
                                System.Globalization.CultureInfo.InvariantCulture);
                    thoigian.TourId = idtour;
                    thoigian.NgayDi = ngaykhoihanh;
                    thoigian.NgayVe = ngayve;
                    thoigian.SoLuongMax = tt.SLMax;
                    thoigian.SoLuongDat = 0;
                    thoigian.Gia = tt.Gia;
                    thoigian.TrangThai = 1;

                    _context.Add(thoigian);
                    _context.SaveChanges();
                }

                //insert table LichTrinh
                foreach (var lt in tour_Serialize.Lichtrinh)
                {
                    var lichtrinh = new LichTrinh();
                    lichtrinh.TourId = idtour;
                    lichtrinh.Ngay = lt.Ngay;
                    lichtrinh.Sang = lt.Sang;
                    lichtrinh.Trua = lt.Trua;
                    lichtrinh.Toi = lt.Toi;
                    lichtrinh.TrangThai = 1;

                    _context.Add(lichtrinh);
                    _context.SaveChanges();
                }


                //insert table AnhTour
                List<string> Anh = new List<string>();
                foreach (var at in tour_Serialize.Hinhanh)
                {
                    var anhtour = new AnhTour();
                    DateTime now = DateTime.Now;
                    string tenanh = idtour.ToString() + "_" + now.ToString("yyMMddhhmmss") + "_" + at.tenanh;
                    anhtour.TourId = idtour;
                    anhtour.Anh = tenanh;

                    Anh.Add(tenanh);
                    _context.Add(anhtour);
                    _context.SaveChanges();

                }
                // Commit transaction if all commands succeed, transaction will auto-rollback
                // when disposed if either commands fails
                transaction.Commit();
                return Ok(new {
                    message = "Create tour success",
                    listAnh = Anh
                });
            }
            catch (Exception)
            {
                // TODO: Handle failure
                transaction.Rollback();
                return BadRequest("Create tour fail");
                
            }

        }
        
    }
}
