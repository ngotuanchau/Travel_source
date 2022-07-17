
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Travel.Data;
using Travel.Models;
using Travel.Serialize;

namespace Travel.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        public IConfiguration _configuration;
        private readonly TravelContext _context;

        public UserController(IConfiguration configuration, TravelContext context)
        {
            _context = context;
            _configuration = configuration;
        }
        [Authorize]
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> create(NguoiDung nd)
        {
            if (CheckEmailExist(nd.Email))
            {
                nd.MatKhau = GetMD5(nd.MatKhau);
                _context.NguoiDungs.Add(nd);
                await _context.SaveChangesAsync();
                return Ok(nd);
            }
            return BadRequest(new { message = "Email existed" });


        }
        [Authorize]
        [Authorize(Roles = "User")]
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Edit([FromRoute] int id, NguoiDung nd)
        {
            var user = _context.NguoiDungs.FirstOrDefault(nd => nd.Id == id);
            if (user == null)
            {
                return NotFound(new { message = "User does not existed" });
            }
            else
            {
                user.HoTen = nd.HoTen;
                user.NgaySinh = nd.NgaySinh;
                user.TenNguoiDung = nd.TenNguoiDung;
                user.Cmnd = nd.Cmnd;
                user.Sdt = nd.Sdt;
                user.Avt = nd.Avt;
                user.NgaySua = DateTime.Now;
                _context.Update(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "User Id " + user.Id + " update success" });
            }
        }

        [Authorize]
        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var user = await _context.NguoiDungs.FirstOrDefaultAsync(x => x.Id == id);
            if (user != null)
            {
                _context.Remove(user);
                await _context.SaveChangesAsync();
                return Ok(new { message = "User Id " + user.Id + " delete success" });
            }
            return NotFound(new { message = "User does not existed" });
        }
        public static string GetMD5(string str)
        {
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] fromData = Encoding.UTF8.GetBytes(str);
            byte[] targetData = md5.ComputeHash(fromData);
            string byte2String = null;

            for (int i = 0; i < targetData.Length; i++)
            {
                byte2String += targetData[i].ToString("x2");

            }
            return byte2String;
        }
        private bool CheckEmailExist(string email)
        {
            var result = _context.NguoiDungs.FirstOrDefault(nd => nd.Email == email);
            if (result != null)
                return false;
            return true;
        }

        [Authorize]
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> get_user([FromRoute] int id)
        {
            try
            {
                NguoiDung nguoiDung = _context.NguoiDungs.Where(u => u.TrangThai != 0 && u.Id == id).FirstOrDefault();
                if (nguoiDung == null)
                {
                    return StatusCode(404, "User not found");
                }
                User_serialize user_Serialize = new User_serialize();
                user_Serialize.Id = nguoiDung.Id;
                user_Serialize.HoTen = nguoiDung.HoTen;
                user_Serialize.Avt = nguoiDung.Avt;
                user_Serialize.Cmnd = nguoiDung.Cmnd;
                user_Serialize.Email = nguoiDung.Email;
                user_Serialize.isAdmin = nguoiDung.isAdmin;
                user_Serialize.NgaySinh = nguoiDung.NgaySinh;
                user_Serialize.Sdt = nguoiDung.Sdt;
                user_Serialize.TenNguoiDung = nguoiDung.TenNguoiDung;
                user_Serialize.TrangThai = nguoiDung.TrangThai;

                return Json(user_Serialize);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }

        [Authorize]
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("user_get")]
        [ActionName("get_all_user")]
        public async Task<IActionResult> get_all_user()
        {
            try
            {
                List<NguoiDung> nguoiDungs = _context.NguoiDungs.ToList();
                
                List<User_serialize> user_Serializes = new List<User_serialize>();
                foreach (var nd in nguoiDungs)
                {
                    User_serialize user_Serialize = new User_serialize();
                    user_Serialize.Id = nd.Id;
                    user_Serialize.HoTen = nd.HoTen;
                    user_Serialize.Avt = nd.Avt;
                    user_Serialize.Cmnd = nd.Cmnd;
                    user_Serialize.Email = nd.Email;
                    user_Serialize.isAdmin = nd.isAdmin;
                    user_Serialize.NgaySinh = nd.NgaySinh;
                    user_Serialize.Sdt = nd.Sdt;
                    user_Serialize.TenNguoiDung = nd.TenNguoiDung;
                    user_Serialize.TrangThai = nd.TrangThai;

                    user_Serializes.Add(user_Serialize);
                }
                

                return Ok(user_Serializes);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }
        [Authorize]
        [HttpPut]
        [Route("user/change_password/{id:int}")]
        [Authorize(Roles = "User")]
        [ActionName("change_password")]
        public async Task<IActionResult> change_password([FromRoute] int id, changepassword_serialize changepassword_Serialize)
        {
            try
            {

                NguoiDung nguoiDung = _context.NguoiDungs.Where(t => t.TrangThai != 0 && t.Id == id).FirstOrDefault();
                if (nguoiDung == null)
                {
                    return NotFound("Người dùng không tồn tại");
                }
                var password_old = GetMD5(changepassword_Serialize.passwordold);
                var password_new = GetMD5(changepassword_Serialize.passwordnew);
                if (password_old != nguoiDung.MatKhau)
                {
                    return BadRequest(new
                    {
                        message = "Mật khẩu không đúng"
                    });
                }
                nguoiDung.MatKhau = password_new;
                _context.SaveChanges();

                return Ok(new
                {
                    message = "change password success"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }

        [Authorize]
        [HttpGet]
        [Route("user/get_tour_dadat/{id:int}")] //id nguoidung
        //[Authorize(Roles = "User")]
        [ActionName("get_tour_dadat")]
        public async Task<IActionResult> get_tour_dadat([FromRoute] int id)
        {
            try
            {

                List<HoaDon> hoaDons = _context.HoaDons.Include(h => h.Tour).Include(h => h.NguoiDung).Where(h => h.NguoiDungId == id).ToList();
                List<getTourDaDat_serialize> getTourDaDat_Serializes = new List<getTourDaDat_serialize>();
                
                foreach( var hoadon in hoaDons)
                {
                    getTourDaDat_serialize getTourDaDat_Serialize = new getTourDaDat_serialize();
                    getTourDaDat_Serialize.id = hoadon.Id;
                    getTourDaDat_Serialize.nguoidungid = hoadon.NguoiDungId;
                    getTourDaDat_Serialize.ngaykh = _context.ThoiGians.Where(t => t.Id == hoadon.ThoiGianId).FirstOrDefault().NgayDi;
                    getTourDaDat_Serialize.sovenguoilon = hoadon.TongSoVeNl;
                    getTourDaDat_Serialize.sovetreem = hoadon.TongSoVeTe;
                    getTourDaDat_Serialize.sovetrenho = hoadon.TongSoVeTn;
                    getTourDaDat_Serialize.tencongty = _context.Tours.Include(t => t.CongTy).Where(t => t.Id == hoadon.TourId).FirstOrDefault().CongTy.Tencongty;
                    int id_diemdi = _context.Tours.Include(t => t.CongTy).Where(t => t.Id == hoadon.TourId).FirstOrDefault().DiemDi;
                    getTourDaDat_Serialize.diemdi = _context.DiaDiems.Where(t => t.Id == id_diemdi).FirstOrDefault().Ten;
                    getTourDaDat_Serialize.tentour = _context.Tours.Where(t => t.Id == hoadon.TourId).FirstOrDefault().TenTour;
                    getTourDaDat_Serialize.anhtour = _context.Tours.Where(t => t.Id == hoadon.TourId).FirstOrDefault().AnhTour;
                    getTourDaDat_Serialize.idtour = _context.Tours.Where(t => t.Id == hoadon.TourId).FirstOrDefault().Id;
                    getTourDaDat_Serialize.thoigianid = hoadon.ThoiGianId;
                    getTourDaDat_Serialize.tongtien = hoadon.TongTien;
                    getTourDaDat_Serialize.trangthaihoadon = hoadon.TrangThai;
                    getTourDaDat_Serialize.trangthaitour = _context.ThoiGians.Where(t => t.Id == hoadon.ThoiGianId).FirstOrDefault().TrangThai;
                    getTourDaDat_Serialize.ngaydat = hoadon.NgayTao.ToString("dd/MM/yyyy");

                    getTourDaDat_Serializes.Add(getTourDaDat_Serialize);
                }

                return Ok(getTourDaDat_Serializes);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }

        [Authorize]
        [HttpDelete]
        [Route("user/huy_tourdat/{id:int}")] //id hoadon
        //[Authorize(Roles = "User")]
        [ActionName("huy_tourdat")]
        public async Task<IActionResult> huy_tourdat([FromRoute] int id)
        {
            try
            {

                HoaDon hoaDons = _context.HoaDons.Include(h => h.Tour).Include(h => h.NguoiDung).Where(h => h.Id == id).FirstOrDefault();
                if (hoaDons == null)
                {
                    return NotFound(new
                    {
                        message = "Hóa đơn không tồn tại"
                    });
                }

                ThoiGian thoiGian = _context.ThoiGians.Where(t => t.TrangThai == 2 && t.Id == hoaDons.ThoiGianId).FirstOrDefault();
                if (thoiGian != null)
                {
                    return BadRequest(new
                    {
                        message = "Tour đã được chuẩn bị, không thể hủy"
                    });
                }
                if (hoaDons.TrangThai == 2 || hoaDons.TrangThai == 1)
                {
                    hoaDons.TrangThai =7;
                }
                else if(hoaDons.TrangThai == 3)
                {
                    hoaDons.TrangThai = 8;
                }    
                _context.SaveChanges();
                return Ok(new { 
                    message = "Hủy tour thành công"
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
