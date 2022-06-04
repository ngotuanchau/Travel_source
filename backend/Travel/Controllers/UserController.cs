
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

namespace Travel.Controllers
{
    [Authorize]
    [Authorize(Roles = "Admin")]
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

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Edit([FromRoute] int id, NguoiDung nd)
        {
            var user = _context.NguoiDungs.FirstOrDefault(nd => nd.Id == id);
            if (user == null)
            {
                return NotFound(new { message = "User does not existed"});
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

    }
}
