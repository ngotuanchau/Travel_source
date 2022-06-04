using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Data;
using Travel.Models.custom;
using Travel.Models;
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
        public async Task<IActionResult> createTour([FromBody] TourCreate tourCreate)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var tour = new Tour();
                tour.CongTyId = tourCreate.rTour.CongtyId;
                tour.TheLoaiId = tourCreate.rTour.TheLoaiId;
                tour.TenTour = tourCreate.rTour.TenTour;
                tour.DiemDi = tourCreate.rTour.DiemDi;
                tour.CanChuanBi = "";
                tour.DiemNoiBat = "";
                tour.TrangThai = 1;
                foreach (string x in tourCreate.rTour.CanChuanBi)
                {
                    tour.CanChuanBi += (" - " + x);
                }
                foreach (string x in tourCreate.rTour.DiemNoiBat)
                {
                    tour.DiemNoiBat += (" - " + x);
                }
                _context.Tours.Add(tour);
                _context.SaveChanges();
                int a = tour.Id;
                int idtour = tour.Id;

                //Insert dia diem   
                foreach (var dd in tourCreate.rDiaDiem)
                {
                    var diadiem = new DiaDiem();
                    diadiem.TourId = idtour;
                    diadiem.Ten = dd.Ten;
                    diadiem.TrangThai = 1;
                    _context.Add(diadiem);
                    _context.SaveChanges();
                }

                //insert thoi gian
                foreach (var tt in tourCreate.rThoiGians)
                {
                    var thoigian = new ThoiGian();
                    DateTime ngaydi = DateTime.ParseExact(tt.NgayDi, "dd/MM/yyyyTHH:mm",
                                System.Globalization.CultureInfo.InvariantCulture);
                    DateTime ngayve = DateTime.ParseExact(tt.NgayVe, "dd/MM/yyyyTHH:mm",
                                System.Globalization.CultureInfo.InvariantCulture);
                    thoigian.TourId = idtour;
                    thoigian.NgayDi = ngaydi;
                    thoigian.NgayVe = ngayve;
                    thoigian.SoLuongMax = tt.SoLuongToiDa;
                    thoigian.GiaDefaut = tt.GiaMacDinh;
                    thoigian.TrangThai = 1;
                    _context.Add(thoigian);
                    _context.SaveChanges();
                }

                //insert lich trinh
                var lichtrinh = new LichTrinh();
                lichtrinh.TourId = idtour;
                lichtrinh.Sang = tourCreate.rLichTrinh.Sang;
                lichtrinh.Trua = tourCreate.rLichTrinh.Trua;
                lichtrinh.Chieu = tourCreate.rLichTrinh.Chieu;
                lichtrinh.TrangThai = 1;
                _context.Add(lichtrinh);
                _context.SaveChanges();

                //insert chi tiet dich vu
                var chitietdichvu = new ChiTietDichVu();
                chitietdichvu.TourId = idtour;
                chitietdichvu.CoTrongVe = tourCreate.rChiTietDichVu.CoTrongVe;
                chitietdichvu.KhongTrongVe = tourCreate.rChiTietDichVu.KhongTrongVe;
                chitietdichvu.CheDoTreEm = tourCreate.rChiTietDichVu.KhongTrongVe;
                chitietdichvu.TrangThai = 1;
                _context.Add(chitietdichvu);
                _context.SaveChanges();

                //insert ghi chu
                foreach (var gc in tourCreate.rGhiChus)
                {
                    var ghichu = new GhiChu();
                    ghichu.TourId = idtour;
                    ghichu.TieuDe = gc.TieuDe;
                    ghichu.NoiDung = gc.NoiDung;
                    ghichu.TrangThai = 1;
                    _context.Add(ghichu);
                    _context.SaveChanges();
                }

                //insert anh tour
                foreach (var at in tourCreate.rAnhTour)
                {
                    var anhtour = new AnhTour();
                    var index = at.Anh.IndexOf(',');
                    var base64stringWithoutSignature = at.Anh.Substring(index + 1);

                    index = at.Anh.IndexOf(';');
                    var base64signature = at.Anh.Substring(0, index);
                    index = base64signature.IndexOf("/");
                    var extension = base64signature.Substring(index + 1);
                    byte[] bytes = Convert.FromBase64String(base64stringWithoutSignature);
                    DateTime now = DateTime.Now;
                    var filename = idtour + "_" + now.ToString("yyMMddhhmmss") + "." + extension;
                    await System.IO.File.WriteAllBytesAsync("wwwroot/Anh_tour/" + filename, bytes);
                    anhtour.TourId = idtour;
                    anhtour.Anh = filename;
                    anhtour.TrangThai = 1;
                    _context.Add(anhtour);
                    _context.SaveChanges();
                }
                // Commit transaction if all commands succeed, transaction will auto-rollback
                // when disposed if either commands fails
                transaction.Commit();
                return Ok("Create tour success");
            }
            catch (Exception)
            {
                // TODO: Handle failure
                return BadRequest("Create tour fail");
            }

        }
        [HttpGet]
        [ActionName("getTour")]
        public async Task<IActionResult> getTour()
        {
            try
            {
                List<getTours> result = new List<getTours>();
                List<Tour> tours = _context.Tours.Include(t => t.TheLoai).Include(t => t.CongTy).Where(t => t.TrangThai == 1).ToList();
                foreach (var tour in tours)
                {
                    getTours gt = new getTours();
                    gt.tenTour = tour.TenTour;
                    gt.id = tour.Id;
                    gt.theLoaiId = tour.TheLoaiId;
                    gt.Tenloai = tour.TheLoai.TenLoai;
                    gt.TencongTy = tour.CongTy.Tencongty;
                    gt.congTyId = tour.CongTyId;
                    gt.moTa = tour.MoTa;
                    gt.canChuanBi = tour.CanChuanBi;
                    gt.diemNoiBat = tour.DiemNoiBat;
                    gt.diemDi = tour.DiemDi;
                    gt.ngayTao = tour.NgayTao;
                    var anhtour = _context.AnhTours.FirstOrDefault(p => p.TourId == tour.Id);
                    if (anhtour == null)
                    {
                        gt.anhTours = "default.jpg";
                    }
                    else
                    {
                        gt.anhTours = anhtour.Anh;
                    }
                    var gia = _context.ThoiGians.OrderByDescending(p => p.GiaDefaut).FirstOrDefault(p => p.TourId == tour.Id);
                    gt.Gia = gia.GiaDefaut;

                    result.Add(gt);
                }
                return Json(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "error occurred" });
            }

        }

        [HttpGet]
        [Route("{id:int}")]
        [ActionName("getaTour")]
        public async Task<IActionResult> getaTour([FromRoute] int id)
        {
            try
            {
                // get tour
                var tour = _context.Tours.Include(t => t.TheLoai).Include(t => t.CongTy).FirstOrDefault(t => t.Id == id);
                if (tour == null)
                {
                    throw new Exception();
                }
                //get anh tour
                List<string> anhtours = new List<string>();
                var anhtour = _context.AnhTours.Where(a => a.TourId == id && a.TrangThai == 1).ToList();
                foreach (AnhTour a in anhtour)
                {
                    anhtours.Add(a.Anh);
                }
                var ctdv = _context.ChiTietDichVus.FirstOrDefault(c => c.TourId == id && c.TrangThai == 1);
                if (ctdv == null)
                {
                    throw new Exception();
                }
                //get dia diem
                List<object> diadiems = new List<object>();
                List<string> anhdd = new List<string>();
                var diadiem = _context.DiaDiems.Include(a => a.AnhDds).Where(a => a.TourId == id && a.TrangThai == 1).ToList();
                foreach (DiaDiem d in diadiem)
                {
                    var anhdds = _context.AnhDds.Where(a => a.DiaDiemId == d.Id && a.TrangThai == 1).ToList();
                    foreach (AnhDd add in anhdds)
                    {
                        anhdd.Add(add.Anh);
                    }
                    var result = new { diadiemid = d.Id, tendiadiem = d.Ten, hinhanh = anhdd };
                    diadiems.Add(result);
                }
                //get gia tre em
                List<object> giatreems = new List<object>();
                var giatreem = _context.GiaTreEms.Where(gte => gte.TourId == id && gte.TrangThai == 1).ToList();
                foreach (GiaTreEm gte in giatreem)
                {
                    var result = new { giatreemid = gte.Id, dotuoi = gte.DoTuoi, giave = gte.GiaVe };
                    giatreems.Add(result);
                }
                //get thoi gian
                List<object> thoigians = new List<object>();
                var thoigian = _context.ThoiGians.Where(tg => tg.TourId == id && tg.TrangThai == 1).ToList();
                foreach (ThoiGian tg in thoigian)
                {
                    var result = new { thoigianid = tg.Id, ngaydi = tg.NgayDi, ngayve = tg.NgayVe, giadefault = tg.GiaDefaut };
                    thoigians.Add(result);
                }
                //get lich trinh
                List<object> lichtrinhs = new List<object>();
                var lichtrinh = _context.LichTrinhs.Where(lt => lt.TourId == id && lt.TrangThai == 1).ToList();
                foreach (LichTrinh lt in lichtrinh)
                {
                    var result = new { lichtrinhid = lt.Id, sang = lt.Sang, trua = lt.Trua, chieu = lt.Chieu };
                    lichtrinhs.Add(result);
                }
                //get ghi chu
                List<object> ghichus = new List<object>();
                var ghichu = _context.GhiChus.Where(gc => gc.TourId == id && gc.TrangThai == 1).ToList();
                foreach (GhiChu gc in ghichu)
                {
                    var result = new { ghichuid = gc.Id, tieude = gc.TieuDe, noidung = gc.NoiDung };
                    ghichus.Add(result);
                }
                //get khuyen mai
                List<object> khuyenmais = new List<object>();
                var khuyenmai = _context.KhuyenMais.Where(km => km.TourId == id && km.NgayHetHan <= DateTime.Now && km.TrangThai == 1).ToList();
                foreach (KhuyenMai km in khuyenmai)
                {
                    var result = new { khuyenmaiid = km.Id, tenkhuyenmai = km.TenKm, giatri = km.GiaTri, ngayapdung = km.NgayApDung, ngayhethan = km.NgayHetHan };
                    khuyenmais.Add(result);
                }
                return Json(new
                {
                    tentour = tour.TenTour,
                    theloaiid = tour.TheLoaiId,
                    Tenloai = tour.TheLoai.TenLoai,
                    congtyid = tour.CongTyId,
                    Tencongty = tour.CongTy.Tencongty,
                    congty_email = tour.CongTy.Email,
                    congty_mst = tour.CongTy.Mst,
                    congty_sdt = tour.CongTy.Sdt,
                    congty_vanphong = tour.CongTy.VanPhong,
                    congty_khuvuc = tour.CongTy.KhuVuc,
                    congty_thenganhang = tour.CongTy.TheNganHang,
                    mota = tour.MoTa,
                    canchuanbi = tour.CanChuanBi,
                    diemnoibat = tour.DiemNoiBat,
                    diemdi = tour.DiemDi,
                    ctdvid = ctdv.Id,
                    dichvu_cotrongve = ctdv.CoTrongVe,
                    dichvu_khongcotrongve = ctdv.KhongTrongVe,
                    dichvu_chedotrem = ctdv.CheDoTreEm,
                    anhtour = anhtours,
                    diadiem = diadiems,
                    giatreem = giatreems,
                    thoigian = thoigians,
                    lichtrinh = lichtrinhs,
                    ghichu = ghichus,
                    khuyenmai = khuyenmais

                });
            }
            catch (Exception)
            {
                return NotFound("Tourid does not existed");
            }
        }
    }
}
