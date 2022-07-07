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
                string tenanh = "default.png";
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
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                transaction.Rollback();
                return StatusCode(500, "Internal Server Error");

            }

        }
        [Authorize]
        [Authorize(Roles = "Business")]
        [HttpGet]
        [Route("get_all_tour_bussiness/{id:int}")]
        [ActionName("getallTour_bussiness")]
        public async Task<IActionResult> getallTour_bussiness([FromRoute] int id)
        {
            try
            {
                List<Tour_serialize> result = new List<Tour_serialize>();
                List<Tour> tours = _context.Tours.Include(t => t.TheLoai).Include(t => t.CongTy).Include(t => t.PhanVung).Where(t => t.CongTyId == id).OrderByDescending(t => t.NgayTao).ToList();
                foreach (var tour in tours)
                {
                    // Get information tour
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
                    tour_Serialize.Mota = tour.MoTa;
                    tour_Serialize.AmThuc = tour.AmThuc;
                    tour_Serialize.LuuTru = tour.LuuTru;
                    tour_Serialize.Phuongtien = tour.PhuongTien;
                    tour_Serialize.Anhtour = tour.AnhTour;

                    // Get List Thoi Gian
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

                    // Get List dia diem
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


                    // Get List hinh anh
                    List<Hinhanh> hinhanhs = new List<Hinhanh>();
                    List<AnhTour> anhTours = _context.AnhTours.Where(p => p.TourId == tour.Id && p.TrangThai == 1).ToList();
                    foreach (var at in anhTours)
                    {
                        Hinhanh hinhanh = new Hinhanh();
                        hinhanh.Id = at.Id;
                        hinhanh.tenanh = at.Anh;
                        hinhanhs.Add(hinhanh);
                    }
                    tour_Serialize.Hinhanh = hinhanhs;

                    // Get List lich trinh
                    List<Lichtrinh> lichtrinhs = new List<Lichtrinh>();
                    List<Models.LichTrinh> mlichTrinhs = _context.LichTrinhs.Where(p => p.TourId == tour.Id && p.TrangThai == 1).ToList();
                    foreach (var lt in mlichTrinhs)
                    {
                        Serialize.Lichtrinh lichTrinh = new Serialize.Lichtrinh();
                        lichTrinh.Id = lt.Id;
                        lichTrinh.Ngay = lt.Ngay;
                        lichTrinh.MoTa = lt.MoTa;
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
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
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
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
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
                    // Get information tour
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
                    tour_Serialize.Mota = tour.MoTa;
                    tour_Serialize.AmThuc = tour.AmThuc;
                    tour_Serialize.LuuTru = tour.LuuTru;
                    tour_Serialize.Phuongtien = tour.PhuongTien;
                    tour_Serialize.Anhtour = tour.AnhTour;

                    // Get List Thoi Gian
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

                    // Get List dia diem
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


                    // Get List hinh anh
                    List<Hinhanh> hinhanhs = new List<Hinhanh>();
                    List<AnhTour> anhTours = _context.AnhTours.Where(p => p.TourId == tour.Id && p.TrangThai == 1).ToList();
                    foreach (var at in anhTours)
                    {
                        Hinhanh hinhanh = new Hinhanh();
                        hinhanh.Id = at.Id;
                        hinhanh.tenanh = at.Anh;
                        hinhanhs.Add(hinhanh);
                    }
                    tour_Serialize.Hinhanh = hinhanhs;

                    // Get List lich trinh
                    List<Lichtrinh> lichtrinhs = new List<Lichtrinh>();
                    List<Models.LichTrinh> mlichTrinhs = _context.LichTrinhs.Where(p => p.TourId == tour.Id && p.TrangThai == 1).ToList();
                    foreach (var lt in mlichTrinhs)
                    {
                        Serialize.Lichtrinh lichTrinh = new Serialize.Lichtrinh();
                        lichTrinh.Id = lt.Id;
                        lichTrinh.Ngay = lt.Ngay;
                        lichTrinh.MoTa = lt.MoTa;
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
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet]
        [Route("get_a_tour/{id:int}")]
        [ActionName("get_a_tour")]
        public async Task<IActionResult> get_a_tour([FromRoute] int id)
        {
            try
            {
                Tour_serialize tour_Serialize = new Tour_serialize();
                Tour tour = _context.Tours.Include(t => t.TheLoai).Include(t => t.CongTy).Include(t => t.PhanVung).Where(t => t.TrangThai == 1 && t.Id == id).FirstOrDefault();
                if (tour == null)
                {
                    return StatusCode(404, "Tour not found");
                }
                // Get information tour
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
                tour_Serialize.Mota = tour.MoTa;
                tour_Serialize.AmThuc = tour.AmThuc;
                tour_Serialize.LuuTru = tour.LuuTru;
                tour_Serialize.Phuongtien = tour.PhuongTien;
                tour_Serialize.Anhtour = tour.AnhTour;

                // Get List Thoi Gian
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

                // Get List dia diem
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


                // Get List hinh anh
                List<Hinhanh> hinhanhs = new List<Hinhanh>();
                List<AnhTour> anhTours = _context.AnhTours.Where(p => p.TourId == tour.Id && p.TrangThai == 1).ToList();
                foreach (var at in anhTours)
                {
                    Hinhanh hinhanh = new Hinhanh();
                    hinhanh.Id = at.Id;
                    hinhanh.tenanh = at.Anh;
                    hinhanhs.Add(hinhanh);
                }
                tour_Serialize.Hinhanh = hinhanhs;

                // Get List lich trinh
                List<Lichtrinh> lichtrinhs = new List<Lichtrinh>();
                List<Models.LichTrinh> mlichTrinhs = _context.LichTrinhs.Where(p => p.TourId == tour.Id && p.TrangThai == 1).ToList();
                foreach (var lt in mlichTrinhs)
                {
                    Serialize.Lichtrinh lichTrinh = new Serialize.Lichtrinh();
                    lichTrinh.Id = lt.Id;
                    lichTrinh.Ngay = lt.Ngay;
                    lichTrinh.MoTa = lt.MoTa;
                    lichTrinh.Sang = lt.Sang;
                    lichTrinh.Trua = lt.Trua;
                    lichTrinh.Toi = lt.Toi;

                    lichtrinhs.Add(lichTrinh);
                }
                tour_Serialize.Lichtrinh = lichtrinhs;


                return Json(tour_Serialize);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }

        //[Authorize]
        [HttpPost]
        [Route("dat_tour")]
        [ActionName("dattour")]
        public async Task<IActionResult> dattour([FromBody] dattour_serialize dattour_Serialize)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                HoaDon hoaDon = new HoaDon();
                hoaDon.NguoiDungId = dattour_Serialize.nguoidungid;
                hoaDon.TourId = dattour_Serialize.tourid;
                hoaDon.TongSoVeNl = dattour_Serialize.sovenguoilon;
                hoaDon.TongSoVeTe = dattour_Serialize.sovetreem;
                hoaDon.ThoiGianId = dattour_Serialize.thoigianid;
                hoaDon.TongSoVeTn = dattour_Serialize.sovetrenho;
                hoaDon.TrangThai = 1;
                _context.Add(hoaDon);
                _context.SaveChanges();

                ThoiGian thoiGian = _context.ThoiGians.Where(t => t.Id == dattour_Serialize.thoigianid && t.TrangThai == 1).FirstOrDefault();
                int vedadat = thoiGian.VeDaDat;
                int vedat = dattour_Serialize.sovetrenho + dattour_Serialize.sovetreem + dattour_Serialize.sovenguoilon;
                int updatevedat = vedadat + vedat;
                thoiGian.VeDaDat = updatevedat;
                _context.SaveChanges();

                transaction.Commit();
                return Ok(new
                {
                    message = "Success",
                });
            }
            catch (BadHttpRequestException)
            {
                transaction.Rollback();
                return StatusCode(404, "Tour not found");
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }

        [Authorize]
        [Authorize(Roles = "Business")]
        [HttpGet]
        [Route("get_user_dattour/{id:int}")]
        [ActionName("get_user_dattour")]
        public async Task<IActionResult> get_user_dattour([FromRoute] int id)
        {
            try
            {
                List<GetUserDatTour_serialize> getUserDatTour_Serializes = new List<GetUserDatTour_serialize>();
                List<HoaDon> hoaDons = _context.HoaDons.Include(h => h.NguoiDung).Include(t => t.Tour).Where(t => t.TrangThai > 0 && t.ThoiGianId == id).ToList();
                if (hoaDons.Count == 0)
                {
                    return StatusCode(404, "Tour not found");
                }
                // Get information tour
                foreach (var hoadon in hoaDons)
                {
                    GetUserDatTour_serialize getUserDatTour_Serialize = new GetUserDatTour_serialize();
                    getUserDatTour_Serialize.id = hoadon.Id;
                    getUserDatTour_Serialize.HoTen = hoadon.NguoiDung.HoTen;
                    getUserDatTour_Serialize.NguoiDungId = hoadon.NguoiDungId;
                    getUserDatTour_Serialize.Sdt = hoadon.NguoiDung.Sdt;
                    getUserDatTour_Serialize.TongSoVeNl = hoadon.TongSoVeNl;
                    getUserDatTour_Serialize.TongSoVeTe = hoadon.TongSoVeTe;
                    getUserDatTour_Serialize.TongTien = hoadon.TongTien;
                    getUserDatTour_Serialize.TrangThai = hoadon.TrangThai;

                    getUserDatTour_Serializes.Add(getUserDatTour_Serialize);
                }



                return Json(getUserDatTour_Serializes);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }

        [Authorize]
        [Authorize(Roles = "Business")]
        [HttpGet]
        [Route("confirm_user_dattour/{id:int}")]
        [ActionName("confirm_user_dattour")]
        public async Task<IActionResult> confirm_user_dattour([FromRoute] int id)
        {
            try
            {
                HoaDon hoaDon = _context.HoaDons.Include(h => h.NguoiDung).Include(t => t.Tour).Where(t => t.TrangThai > 0 && t.Id == id).FirstOrDefault();
                if (hoaDon == null)
                {
                    return StatusCode(404, "Tour not found");
                }

                hoaDon.TrangThai = 2;
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Success",
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
