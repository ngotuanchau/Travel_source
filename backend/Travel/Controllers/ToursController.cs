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
        [Authorize]
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
                string tenanh = "";
                try
                {
                   
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
                    tour.AnhTour = tenanh;
                    tour.TrangThai = 1;
                }
                catch
                {
                    throw new BadHttpRequestException("Bad request");
                }
                _context.Tours.Add(tour);
                _context.SaveChanges();
                int idtour = tour.Id;


                //Insert table DiaDiem_Tour
                foreach (var dd in tour_Serialize.Nhungdiadiem)
                {
                    var diadiem_tour = new DiaDiem_Tour();
                    try
                    {
                        diadiem_tour.TourId = idtour;
                        diadiem_tour.ThuTu = dd.Thutu;
                        diadiem_tour.DiaDiemId = dd.diadiem;
                    }
                    catch
                    {
                        throw new BadHttpRequestException("Bad request");
                    }
                    _context.Add(diadiem_tour);
                    _context.SaveChanges();
                }

                //insert table ThoiGian
                foreach (var tt in tour_Serialize.NhungNgayKhoiHanh)
                {
                    var thoigian = new ThoiGian();

                    try
                    {
                        DateTime ngaykh = DateTime.ParseExact(tt.NgayKh, "dd/MM/yyyy",
                                           System.Globalization.CultureInfo.InvariantCulture);
                        thoigian.TourId = idtour;
                        thoigian.NgayDi = ngaykh;
                        thoigian.GiaNguoiLon = tt.GiaNguoiLon;
                        thoigian.GiaTreEm = tt.GiaTreEn;
                        thoigian.GiaTreNho = tt.GiaTreNho;
                        thoigian.VeDaDat = 0;
                        thoigian.TrangThai = 1;
                    }
                    catch
                    {
                        throw new BadHttpRequestException("Bad request");
                    }
                    _context.Add(thoigian);
                    _context.SaveChanges();
                }

                //insert table LichTrinh
                foreach (var lt in tour_Serialize.Lichtrinh)
                {
                    var lichtrinh = new LichTrinh();
                    try
                    {
                        lichtrinh.TourId = idtour;
                        lichtrinh.Ngay = lt.Ngay;
                        lichtrinh.MoTa = lt.MoTa;
                        lichtrinh.Sang = lt.Sang;
                        lichtrinh.Trua = lt.Trua;
                        lichtrinh.Chieu = lt.Chieu;
                        lichtrinh.Toi = lt.Toi;
                        lichtrinh.TrangThai = 1;
                    }
                    catch
                    {
                        throw new BadHttpRequestException("Bad request");
                    }
                    _context.Add(lichtrinh);
                    _context.SaveChanges();
                }


             
                // Commit transaction if all commands succeed, transaction will auto-rollback
                // when disposed if either commands fails
                transaction.Commit();
                return Ok(new {
                    message = "Create tour success",
                    IdTour = idtour
                });
            }
            catch (BadHttpRequestException)
            {
                transaction.Rollback();
                return BadRequest("Bad request");
            }
            catch (Exception)
            {
                // TODO: Handle failure
                transaction.Rollback();
                return StatusCode(500, "Internal Server Error");

            }

        }

        [HttpGet]
        [Route("get_all_tour")]
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
        [Authorize]
        [HttpPost]
        [Route("update_anh")]
        [Authorize(Roles = "Business")]
        [ActionName("updateAnh")]
        public async Task<IActionResult> updateAnh([FromBody] update_anh_serialize update_Anh_Serialize)
        {
            try
            {
                foreach (var anh in update_Anh_Serialize.Anhs)
                {
                    Tour tour = _context.Tours.Where(t => t.Id == anh.idtour).FirstOrDefault();
                    if (tour == null)
                    {
                        throw new BadHttpRequestException("Bad request");
                    }
                    tour.AnhTour = anh.tenanh;
                    _context.SaveChanges();
                }
                

                return Ok(new
                {
                    message = "Success",
                });
            }
            catch (BadHttpRequestException)
            {
                return StatusCode(404, "Tour not found");
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet]
        [Route("get_tour_new")]
        [ActionName("gettour_moi")]
        public async Task<IActionResult> gettour_moi()
        {
            try
            {
                List<Tour_serialize> result = new List<Tour_serialize>();
                List<Tour> tours = _context.Tours.Include(t => t.TheLoai).Include(t => t.CongTy).Include(t => t.PhanVung).Where(t => t.TrangThai == 1).OrderByDescending(t => t.NgayTao).ToList();
                foreach (var tour in tours)
                {
                    Tour_serialize tour_Serialize = new Tour_serialize();
                    tour_Serialize.Id = tour.Id;
                    tour_Serialize.Tentour = tour.TenTour;
                    tour_Serialize.Theloai = tour.TheLoaiId;
                    tour_Serialize.Tentheloai = tour.TheLoai.TenLoai;
                    tour_Serialize.Phanvung = tour.PhanVungId;
                    tour_Serialize.Tenphanvung = tour.PhanVung.TenVung;
                    tour_Serialize.Congty = tour.CongTyId;
                    tour_Serialize.Tencongty = tour.CongTy.Tencongty;
                    tour_Serialize.VeToiDa = tour.VeDoiDa;
                    tour_Serialize.VeToiThieu = tour.VeToiThieu;
                    tour_Serialize.SoNgay = tour.SoNgay;
                    tour_Serialize.SoDem = tour.SoDem;
                    tour_Serialize.DiemDi = tour.DiemDi;
                    tour_Serialize.Tendiemdi = _context.DiaDiems.Where(d => d.Id == tour.DiemDi).FirstOrDefault().Ten;
                    tour_Serialize.DiemDen = tour.DiemDen;
                    tour_Serialize.Tendiemden = _context.DiaDiems.Where(d => d.Id == tour.DiemDen).FirstOrDefault().Ten;
                    tour_Serialize.AmThuc = tour.AmThuc;
                    tour_Serialize.LuuTru = tour.LuuTru;
                    tour_Serialize.Phuongtien = tour.PhuongTien;
                    tour_Serialize.Anhtour = tour.AnhTour;

                    List<NhungNgayKhoiHanh> nhungNgayKhoiHanhs = new List<NhungNgayKhoiHanh>();
                    List<ThoiGian> thoiGians = _context.ThoiGians.Where(p => p.TourId == tour.Id && p.TrangThai == 1).ToList();
                    foreach (var tg in thoiGians)
                    {
                        NhungNgayKhoiHanh nhungNgayKhoiHanh = new NhungNgayKhoiHanh();
                        nhungNgayKhoiHanh.Id = tg.Id;
                        nhungNgayKhoiHanh.NgayKh = tg.NgayDi.ToString();
                        nhungNgayKhoiHanh.GiaNguoiLon = tg.GiaNguoiLon;
                        nhungNgayKhoiHanh.GiaTreEn = tg.GiaTreEm;
                        nhungNgayKhoiHanh.GiaTreNho = tg.GiaTreNho;
                        nhungNgayKhoiHanh.Vedadat = tg.VeDaDat;
                        nhungNgayKhoiHanhs.Add(nhungNgayKhoiHanh);
                    }
                    tour_Serialize.NhungNgayKhoiHanh = nhungNgayKhoiHanhs;

                    List<Nhungdiadiem> nhungdiadiems = new List<Nhungdiadiem>();
                    List<DiaDiem_Tour> diaDiem_Tours = _context.DiaDiem_Tours.Where(p => p.TourId == tour.Id && p.TrangThai == 1).ToList();
                    foreach (var dd in diaDiem_Tours)
                    {
                        Nhungdiadiem nhungdiadiem = new Nhungdiadiem();
                        nhungdiadiem.Id = dd.Id;
                        nhungdiadiem.Thutu = dd.ThuTu;
                        nhungdiadiem.diadiem = dd.DiaDiemId;
                        nhungdiadiem.Tendiadiem = _context.DiaDiems.Where(d => d.Id == dd.DiaDiemId).FirstOrDefault().Ten;
                        nhungdiadiems.Add(nhungdiadiem);
                    }
                    tour_Serialize.Nhungdiadiem = nhungdiadiems;

                    List<Lichtrinh> lichtrinhs = new List<Lichtrinh>();
                    List<Models.LichTrinh> mlichTrinhs = _context.LichTrinhs.Where(p => p.TourId == tour.Id && p.TrangThai == 1).ToList();
                    foreach (var lt in mlichTrinhs)
                    {
                        Serialize.Lichtrinh lichTrinh = new Serialize.Lichtrinh();
                        lichTrinh.Id = lt.Id;
                        lichTrinh.Ngay = lt.Ngay;
                        lichTrinh.Sang = lt.Sang;
                        lichTrinh.Trua = lt.Trua;
                        lichTrinh.Toi = lt.Toi;

                        lichtrinhs.Add(lichTrinh);
                    }
                    tour_Serialize.Lichtrinh = lichtrinhs;

                    result.Add(tour_Serialize);
                }
                return Json(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
