using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class DoanhnghiepController : Controller
    {

        public IConfiguration _configuration;
        private readonly TravelContext _context;
        public DoanhnghiepController(IConfiguration configuration, TravelContext context)
        {
            _context = context;
            _configuration = configuration;
        }

        [Authorize]
        [HttpGet]
        [Route("doanhnghiep_get")]
        [ActionName("doanhnghiep_get")]
        public async Task<IActionResult> doanhnghiep_get()
        {
            try
            {

                List<CongTy> congTies = _context.CongTies.Where(t => t.TrangThai != 0).ToList();
                List<Congty_serialize> congty_Serializes = new List<Congty_serialize>();
                foreach (var congty in congTies)
                {
                    Congty_serialize ct = new Congty_serialize();
                    ct.Id = congty.Id;
                    ct.KhuVuc = congty.KhuVuc;
                    ct.Mst = congty.Mst;
                    ct.Sdt = congty.Sdt;
                    ct.Tencongty = congty.Tencongty;
                    ct.TheNganHang = congty.TheNganHang;
                    ct.VanPhong = congty.VanPhong;
                    ct.TrangThai = congty.TrangThai;

                    congty_Serializes.Add(ct);
                }

                return Ok(congty_Serializes);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }

        [Authorize]
        [HttpGet]
        [Route("doanhnghiep_get/{id:int}")]
        [ActionName("doanhnghiep_a_get")]
        public async Task<IActionResult> doanhnghiep_a_get([FromRoute] int id)
        {
            try
            {

                CongTy congTies = _context.CongTies.Where(t => t.TrangThai != 0 && t.Id ==id).FirstOrDefault();
                if (congTies == null)
                {
                    return NotFound(new
                    {
                        message = "Doanh nghiệp không tồn tại"
                    });
                }    
                Congty_serialize ct = new Congty_serialize();
                ct.Id = congTies.Id;
                ct.KhuVuc = congTies.KhuVuc;
                ct.Mst = congTies.Mst;
                ct.Sdt = congTies.Sdt;
                ct.Tencongty = congTies.Tencongty;
                ct.TheNganHang = congTies.TheNganHang;
                ct.VanPhong = congTies.VanPhong;
                ct.TrangThai = congTies.TrangThai;

 

                return Ok(ct);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }

        [Authorize]
        [HttpPut]
        [Route("doanhnghiep_update/{id:int}")]
        [Authorize(Roles = "Business")]
        [ActionName("doanhnghiep_update")]
        public async Task<IActionResult> doanhnghiep_update([FromRoute] int id, Congty_serialize congty_Serialize)
        {
            try
            {

                CongTy congTies = _context.CongTies.Where(t => t.TrangThai != 0 && t.Id == id).FirstOrDefault();
                if (congTies == null)
                {
                    return NotFound("Doanh nghiệp không tồn tại");
                }
                congTies.KhuVuc = congty_Serialize.KhuVuc;
                congTies.Mst = congty_Serialize.Mst;
                congTies.Sdt = congty_Serialize.Sdt;
                congTies.Tencongty = congty_Serialize.Tencongty;
                congTies.TheNganHang = congty_Serialize.TheNganHang;
                congTies.VanPhong = congty_Serialize.VanPhong;
                congTies.NgaySua = DateTime.Now;

                _context.SaveChanges();

                return Ok(new { 
                    message = "update success"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }

        [Authorize]
        [HttpPut]
        [Route("doanhnghiep/change_password/{id:int}")]
        [Authorize(Roles = "Business")]
        [ActionName("change_password")]
        public async Task<IActionResult> change_password([FromRoute] int id, changepassword_serialize changepassword_Serialize)
        {
            try
            {

                CongTy congTies = _context.CongTies.Where(t => t.TrangThai != 0 && t.Id == id).FirstOrDefault();
                if (congTies == null)
                {
                    return NotFound("Doanh nghiệp không tồn tại");
                }
                var password_old = GetMD5(changepassword_Serialize.passwordold);
                var password_new = GetMD5(changepassword_Serialize.passwordnew);
                if (password_old != congTies.MatKhau)
                {
                    return BadRequest(new
                    {
                        message = "Mật khẩu không đúng"
                    });
                }
                congTies.MatKhau = password_new;
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
    }
}
