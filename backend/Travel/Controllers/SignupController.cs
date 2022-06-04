using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Travel.Data;
using Travel.Helpers;
using Travel.Models;
using Travel.Serialize;

namespace Travel.Controllers
{
    [Route("api")]
    [ApiController]
    public class SignupController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly TravelContext _context;
        private readonly AppSettings _appSettings;
        public SignupController(IConfiguration configuration, TravelContext context, IOptions<AppSettings> appSettings)
        {
            _context = context;
            _configuration = configuration;
            _appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route("Signup_admin")]
        [ActionName("signup_admin")]
        public async Task<IActionResult> signup_admin(NguoiDung nd)
        {
            if (!CheckEmailExist(nd.Email))
            {
                
                nd.MatKhau = GetMD5(nd.MatKhau);
                nd.isAdmin = true;
                _context.Add(nd);
                await _context.SaveChangesAsync();
                var register_Serialize = new register_serialize()
                {
                    HoTen = nd.HoTen,
                    Email = nd.Email,
                    Sdt = nd.Sdt,
                    Avt = "test"
                };
                return Ok(register_Serialize);


            }
            return StatusCode(400, "Email existed");
        }

        [HttpPost]
        [Route("Signup_user")]
        [ActionName("signup_user")]
        public async Task<IActionResult> signup_user(NguoiDung nd)
        {
            if (!CheckEmailExist(nd.Email))
            {

                nd.MatKhau = GetMD5(nd.MatKhau);
                nd.isAdmin = false;
                _context.Add(nd);
                await _context.SaveChangesAsync();
                var register_Serialize = new register_serialize()
                {
                    HoTen = nd.HoTen,
                    Email = nd.Email,
                    Sdt = nd.Sdt,
                    Avt = "test"
                };
                return Ok(register_Serialize);


            }
            return StatusCode(400, "Email existed");
        }

        [HttpPost]
        [Route("Signup_business")]
        [ActionName("signup_business")]
        public async Task<IActionResult> signup_business(CongTy ct)
        {
            if (!CheckEmailExist(ct.Email))
            {

                ct.MatKhau = GetMD5(ct.MatKhau);
                _context.Add(ct);
                await _context.SaveChangesAsync();
                var register_Serialize = new register_serialize()
                {
                    HoTen = ct.Tencongty,
                    Email = ct.Email,
                    Sdt = ct.Sdt,
                };
                return Ok(register_Serialize);


            }
            return StatusCode(400, "Email existed");
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
            var business = _context.CongTies.FirstOrDefault(ct => ct.Email == email);
            if (result != null || business != null)
                return true;
            return false;
        }
    }
}
