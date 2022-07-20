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
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DiaDiemController : Controller
    {
        public IConfiguration _configuration;
        private readonly TravelContext _context;
        public DiaDiemController(IConfiguration configuration, TravelContext context)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpGet]
        [Route("get_diadiem")]
        //[Authorize(Roles = "Business")]
        [ActionName("getDiaDiem")]
        public async Task<IActionResult> getDiaDiem()
        {
            
            try
            {
                List<DiaDiem> diaDiems = _context.DiaDiems.Where(d => d.TrangThai == 1).ToList();
                List<shortdiadiem_serialize> shortdiadiem_Serializes = new List<shortdiadiem_serialize>();
                
                foreach (var diadiem in diaDiems)
                {
                    shortdiadiem_serialize sd = new shortdiadiem_serialize();
                    List<DiaDiem_Tour> diaDiem_Tours = _context.DiaDiem_Tours.Where(d => d.DiaDiemId == diadiem.Id).ToList();
                    List<Tour> tours = _context.Tours.Where(d => d.DiemDen == diadiem.Id).ToList();
                    sd.id = diadiem.Id;
                    sd.tendiadiem = diadiem.Ten;
                    sd.sotour = diaDiem_Tours.Count + tours.Count;
                    sd.trangthai = diadiem.TrangThai;
                    shortdiadiem_Serializes.Add(sd);
                }
                var result = shortdiadiem_Serializes.OrderByDescending(d => d.sotour);
                return Ok(new
                {
                    listDiaDiem = result
                });
            }
            catch (Exception)
            {
                
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "error occurred" });

            }

        }
        [Authorize]
        [HttpGet]
        [Route("get_all_diadiem")]
        [Authorize(Roles = "Admin")]
        [ActionName("get_all_diadiem")]
        public async Task<IActionResult> get_all_diadiem()
        {

            try
            {
                List<DiaDiem> diaDiems = _context.DiaDiems.ToList();
                
                return Ok(diaDiems);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "error occurred" });

            }

        }
        [Authorize]
        [HttpPost]
        [Route("admin/create_diadiem")]
        [Authorize(Roles = "Admin")]
        [ActionName("create_diadiem")]
        public async Task<IActionResult> create_diadiem(diadiem_serialize diadiem_Serialize)
        {

            try
            {
                DiaDiem diaDiem = new DiaDiem();
                diaDiem.Ten = diadiem_Serialize.tendiadiem;
                diaDiem.TrangThai = 1;
                _context.Add(diaDiem);
                _context.SaveChanges();
                return Ok(new {
                    message = "Thêm địa điểm thành công"
                });
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Internal Server Error " });

            }

        }

        [Authorize]
        [HttpPut]
        [Route("admin/update_diadiem/{id:int}")] // id diadiem
        [Authorize(Roles = "Admin")]
        [ActionName("update_diadiem")]
        public async Task<IActionResult> update_diadiem([FromRoute] int id ,diadiem_serialize diadiem_Serialize)
        {

            try
            {
                DiaDiem diaDiem = _context.DiaDiems.Where(d => d.Id == id && d.TrangThai == 1).FirstOrDefault();
                if (diaDiem == null)
                {
                    return NotFound(new
                    {
                        message = "Địa điểm không tồn tại"
                    });
                }
                diaDiem.Ten = diadiem_Serialize.tendiadiem;
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Update địa điểm thành công"
                });
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Internal Server Error " });

            }

        }

        [Authorize]
        [HttpPut]
        [Route("admin/delete_diadiem/{id:int}")] // id diadiem
        [Authorize(Roles = "Admin")]
        [ActionName("delete_diadiem")]
        public async Task<IActionResult> delete_diadiem([FromRoute] int id)
        {

            try
            {
                DiaDiem diaDiem = _context.DiaDiems.Where(d => d.Id == id && d.TrangThai == 1).FirstOrDefault();
                if (diaDiem == null)
                {
                    return NotFound(new
                    {
                        message = "Địa điểm không tồn tại"
                    });
                }
                diaDiem.TrangThai = 0;
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Delete địa điểm thành công"
                });
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Internal Server Error " });

            }

        }

        [Authorize]
        [HttpPost]
        [Route("doanhnghiep/dexuat_diadiem")]
        [Authorize(Roles = "Business")]
        [ActionName("dexuat_diadiem")]
        public async Task<IActionResult> dexuat_diadiem(diadiem_serialize diadiem_Serialize)
        {

            try
            {
                DiaDiem diaDiem = new DiaDiem();
                diaDiem.Ten = diadiem_Serialize.tendiadiem;
                diaDiem.TrangThai = 2;
                _context.Add(diaDiem);
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Đề xuất điểm thành công"
                });
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Internal Server Error " });

            }

        }

        [Authorize]
        [HttpPut]
        [Route("admin/xacnhan_diadiem/{id:int}")]
        [Authorize(Roles = "Admin")]
        [ActionName("xacnhan_diadiem")]
        public async Task<IActionResult> xacnhan_diadiem([FromRoute] int id)
        {

            try
            {
                DiaDiem diaDiem = _context.DiaDiems.Where(d => d.TrangThai == 2).FirstOrDefault();
                if (diaDiem == null)
                {
                    return NotFound(new
                    {
                        message = "Địa điểm không tồn tại"
                    });
                }
                diaDiem.TrangThai = 1;
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Xác nhận địa điểm thành công"
                });
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Internal Server Error " });

            }

        }

        [Authorize]
        [HttpPut]
        [Route("admin/huy_diadiem/{id:int}")]
        [Authorize(Roles = "Admin")]
        [ActionName("huy_diadiem")]
        public async Task<IActionResult> huy_diadiem([FromRoute] int id)
        {

            try
            {
                DiaDiem diaDiem = _context.DiaDiems.Where(d => d.TrangThai == 2).FirstOrDefault();
                if (diaDiem == null)
                {
                    return NotFound(new
                    {
                        message = "Địa điểm không tồn tại"
                    });
                }
                diaDiem.TrangThai = 0;
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Hủy địa điểm thành công"
                });
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Internal Server Error " });

            }

        }

        [Authorize]
        [HttpPut]
        [Route("admin/khoiphuc_diadiem/{id:int}")]
        [Authorize(Roles = "Admin")]
        [ActionName("khoiphuc_diadiem")]
        public async Task<IActionResult> khoiphuc_diadiem([FromRoute] int id)
        {

            try
            {
                DiaDiem diaDiem = _context.DiaDiems.Where(d => d.TrangThai == 0).FirstOrDefault();
                if (diaDiem == null)
                {
                    return NotFound(new
                    {
                        message = "Địa điểm không tồn tại"
                    });
                }
                diaDiem.TrangThai = 1;
                _context.SaveChanges();
                return Ok(new
                {
                    message = "Khôi phục địa điểm thành công"
                });
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Internal Server Error " });

            }

        }
    }
}
