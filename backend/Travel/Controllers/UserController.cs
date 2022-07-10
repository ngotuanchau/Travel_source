
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
        [Authorize(Roles = "Admin")]
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
    }
}
