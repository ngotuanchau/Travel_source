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

namespace Travel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TheLoaiController : Controller
    {
        public IConfiguration _configuration;
        private readonly TravelContext _context;
        public TheLoaiController(IConfiguration configuration, TravelContext context)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpGet]
        [Route("get_theloai")]
        [ActionName("getTheLoai")]
        public async Task<IActionResult> getTheLoai()
        {

            try
            {
                List<TheLoai> theLoais = _context.TheLoais.Where(t => t.TrangThai == 1).ToList();
                return Ok(new
                {
                    listTheLoai = theLoais
                });
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "error occurred" });

            }

        }

        [Authorize]
        [HttpPost]
        [Route("admin/create_theloai")]
        [Authorize(Roles = "Admin")]
        [ActionName("create_theloai")]
        public async Task<IActionResult> create_diadiem(theloai_serialize theloai_Serialize)
        {

            try
            {
                TheLoai theLoai = new TheLoai();
                theLoai.TenLoai = theloai_Serialize.tentheloai;
                theLoai.TrangThai = 1;
                _context.Add(theLoai);
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Thêm thể loại thành công"
                });
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Internal Server Error " });

            }

        }

        [Authorize]
        [HttpPost]
        [Route("admin/update_theloai/{id:int}")]
        [Authorize(Roles = "Admin")]
        [ActionName("update_theloai")]
        public async Task<IActionResult> update_theloai([FromRoute] int id ,theloai_serialize theloai_Serialize)
        {

            try
            {
                TheLoai theLoai = _context.TheLoais.Where(t => t.TrangThai == 1 && t.Id == id).FirstOrDefault();
                if (theLoai == null)
                {
                    return NotFound(new
                    {
                        message = "Loại tour không tồn tại"
                    });
                }

                theLoai.TenLoai = theloai_Serialize.tentheloai;

                _context.SaveChanges();
                return Ok(new
                {
                    message = "Update thể loại thành công"
                });
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Internal Server Error " });

            }

        }

        [Authorize]
        [HttpDelete]
        [Route("admin/delete_theloai/{id:int}")]
        [Authorize(Roles = "Admin")]
        [ActionName("delete_theloai")]
        public async Task<IActionResult> delete_theloai([FromRoute] int id)
        {

            try
            {
                TheLoai theLoai = _context.TheLoais.Where(t => t.TrangThai == 1 && t.Id == id).FirstOrDefault();
                if (theLoai == null)
                {
                    return NotFound(new
                    {
                        message = "Loại tour không tồn tại"
                    });
                }

                theLoai.TrangThai = 0;

                _context.SaveChanges();
                return Ok(new
                {
                    message = "Xóa thể loại thành công"
                });
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Internal Server Error " });

            }

        }

        [Authorize]
        [HttpDelete]
        [Route("admin/khoiphuc_theloai/{id:int}")]
        [Authorize(Roles = "Admin")]
        [ActionName("khoiphuc_theloai")]
        public async Task<IActionResult> khoiphuc_theloai([FromRoute] int id)
        {

            try
            {
                TheLoai theLoai = _context.TheLoais.Where(t => t.TrangThai == 0 && t.Id == id).FirstOrDefault();
                if (theLoai == null)
                {
                    return NotFound(new
                    {
                        message = "Loại tour không tồn tại"
                    });
                }

                theLoai.TrangThai = 1;

                _context.SaveChanges();
                return Ok(new
                {
                    message = "Khôi phục thể loại thành công"
                });
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Internal Server Error " });

            }

        }

    }
}
