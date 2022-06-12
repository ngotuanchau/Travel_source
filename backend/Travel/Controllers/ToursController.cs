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

                //Insert table GiaTreEm
                foreach (var cdte in tour_Serialize.CheDoTreEm)
                {
                    var giatreem = new GiaTreEm();
                    giatreem.TourId = idtour;
                    giatreem.DoTuoi = cdte.Dotuoi;
                    giatreem.GiaVe = cdte.Gia;
                    giatreem.TrangThai = 1;
                    _context.Add(giatreem);
                    _context.SaveChanges();
                }

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
                    gt.Anuong = tour.AnUong;
                    gt.NoiO = tour.NoiO;
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

                    List<CheDoTreEm> cheDoTreEms = new List<CheDoTreEm>();
                    List<GiaTreEm> giaTreEms = _context.GiaTreEms.Where(p => p.TourId == tour.Id && p.TrangThai == 1).ToList();
                    foreach (var gte in giaTreEms)
                    {
                        CheDoTreEm cheDoTreEm = new CheDoTreEm();
                        cheDoTreEm.Dotuoi = gte.DoTuoi;
                        cheDoTreEm.Gia = gte.GiaVe;
                        cheDoTreEms.Add(cheDoTreEm);
                    }
                    gt.CheDoTreEm = cheDoTreEms;

                    List<NhungNgayKhoiHanh> nhungNgayKhoiHanhs = new List<NhungNgayKhoiHanh>();
                    List<ThoiGian> thoiGians = _context.ThoiGians.Where(p => p.TourId == tour.Id && p.TrangThai == 1).ToList();
                    foreach (var tg in thoiGians)
                    {
                        NhungNgayKhoiHanh nhungNgayKhoiHanh = new NhungNgayKhoiHanh();
                        nhungNgayKhoiHanh.NgayKh = tg.NgayDi.ToString();
                        nhungNgayKhoiHanh.NgayVe = tg.NgayVe.ToString();
                        nhungNgayKhoiHanh.Gia = tg.Gia;
                        nhungNgayKhoiHanh.SLMax = tg.SoLuongMax;
                        nhungNgayKhoiHanh.SLDat = tg.SoLuongDat;
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
