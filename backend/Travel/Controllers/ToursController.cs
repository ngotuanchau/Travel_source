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
                tour.SoNgay = tour_Serialize.SoNgay;
                tour.SoDem = tour_Serialize.SoDem;
                tour.VeDoiDa = tour_Serialize.VeToiDa;
                tour.VeToiThieu = tour_Serialize.VeToiThieu;
                tour.DiemDi = tour_Serialize.DiemDi;
                tour.DiemDen = tour_Serialize.DiemDen;
                tour.AmThuc = tour_Serialize.AmThuc;
                tour.LuuTru = tour_Serialize.LuuTru;
                tour.PhuongTien = tour_Serialize.Phuongtien;
                tour.MoTa = tour_Serialize.Mota;
                DateTime now = DateTime.Now;
                string tenanh = now.ToString("yyMMddhhmmss") + "_" + tour_Serialize.AnhTour;
                tour.AnhTour = tenanh;
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
                    DateTime ngaykh = DateTime.ParseExact(tt.NgayKh, "dd/MM/yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture);
                    thoigian.TourId = idtour;
                    thoigian.NgayDi = ngaykh;
                    thoigian.GiaNguoiLon = tt.GiaNguoiLon;
                    thoigian.GiaTreEm = tt.GiaTreEn;
                    thoigian.GiaTreNho = tt.GiaTreNho;
                    thoigian.VeDaDat = 0;
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
                    lichtrinh.MoTa = lt.MoTa;
                    lichtrinh.Sang = lt.Sang;
                    lichtrinh.Trua = lt.Trua;
                    lichtrinh.Chieu = lt.Chieu;
                    lichtrinh.Toi = lt.Toi;
                    lichtrinh.TrangThai = 1;

                    _context.Add(lichtrinh);
                    _context.SaveChanges();
                }


             
                // Commit transaction if all commands succeed, transaction will auto-rollback
                // when disposed if either commands fails
                transaction.Commit();
                return Ok(new {
                    message = "Create tour success",
                    AnhTour = tenanh
                });
            }
            catch (Exception)
            {
                // TODO: Handle failure
                transaction.Rollback();
                return BadRequest("Create tour fail");
                
            }

        }

        [HttpGet]
        [Route("get_all_tour")]
        [Authorize(Roles = "Business")]
        [ActionName("getallTour")]
        public async Task<IActionResult> getallTour()
        {
            try
            {
                List<Tour_serialize> result = new List<Tour_serialize>();
                List<Tour> tours = _context.Tours.Include(t => t.TheLoai).Include(t => t.CongTy).Include(t => t.PhanVung).Where(t => t.TrangThai == 1).ToList();
                foreach (var tour in tours)
                {
                    Tour_serialize gt = new Tour_serialize();
                    gt.Tentour = tour.TenTour;
                    gt.Theloai = tour.TheLoaiId;
                    //gt.Anuong = tour.AnUong;
                    //gt.NoiO = tour.NoiO;
                    gt.Phanvung = tour.PhanVungId;
                    gt.Phuongtien = tour.PhuongTien;
                    gt.Mota = tour.MoTa;
                    gt.Congty = tour.CongTyId;

                    List<Hinhanh> hinhanhs = new List<Hinhanh>();
                    List<AnhTour> anhtour = _context.AnhTours.Where(p => p.TourId == tour.Id && p.TrangThai == 1).ToList();
                    foreach (var at in anhtour)
                    {
                        Hinhanh hinhanh = new Hinhanh();
                        hinhanh.tenanh = at.Anh;
                        hinhanhs.Add(hinhanh);
                    }
                    gt.Hinhanh = hinhanhs;

                    

                    List<NhungNgayKhoiHanh> nhungNgayKhoiHanhs = new List<NhungNgayKhoiHanh>();
                    List<ThoiGian> thoiGians = _context.ThoiGians.Where(p => p.TourId == tour.Id && p.TrangThai == 1).ToList();
                    foreach (var tg in thoiGians)
                    {
                        NhungNgayKhoiHanh nhungNgayKhoiHanh = new NhungNgayKhoiHanh();
                        //nhungNgayKhoiHanh.NgayKh = tg.NgayDi.ToString();
                        //nhungNgayKhoiHanh.NgayVe = tg.NgayVe.ToString();
                        //nhungNgayKhoiHanh.Gia = tg.Gia;
                        //nhungNgayKhoiHanh.SLMax = tg.SoLuongMax;
                        //nhungNgayKhoiHanh.SLDat = tg.SoLuongDat;
                        nhungNgayKhoiHanhs.Add(nhungNgayKhoiHanh);
                    }
                    gt.NhungNgayKhoiHanh = nhungNgayKhoiHanhs;

                    List<Nhungdiadiem> nhungdiadiems = new List<Nhungdiadiem>();
                    List<DiaDiem_Tour> diaDiem_Tours = _context.DiaDiem_Tours.Where(p => p.TourId == tour.Id && p.TrangThai == 1).ToList();
                    foreach (var dd in diaDiem_Tours)
                    {
                        Nhungdiadiem nhungdiadiem = new Nhungdiadiem();
                        nhungdiadiem.Thutu = dd.ThuTu;
                        nhungdiadiem.diadiem = dd.DiaDiemId;
                        nhungdiadiems.Add(nhungdiadiem);
                    }
                    gt.Nhungdiadiem = nhungdiadiems;

                    List<Lichtrinh> lichtrinhs = new List<Lichtrinh>();
                    List<Models.LichTrinh> mlichTrinhs = _context.LichTrinhs.Where(p => p.TourId == tour.Id && p.TrangThai == 1).ToList();
                    foreach (var lt in mlichTrinhs)
                    {
                        Serialize.Lichtrinh lichTrinh = new Serialize.Lichtrinh();
                        lichTrinh.Ngay = lt.Ngay;
                        lichTrinh.Sang = lt.Sang;
                        lichTrinh.Trua = lt.Trua;
                        lichTrinh.Toi = lt.Toi;

                        lichtrinhs.Add(lichTrinh);
                    }
                    gt.Lichtrinh = lichtrinhs;
                    result.Add(gt);
                }
                return Json(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "error occurred" });
            }

        }

    }
}
