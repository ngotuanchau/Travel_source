using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Data;
using Travel.Models;

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
    }
}
