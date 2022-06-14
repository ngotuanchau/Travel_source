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
    public class PhanVungController : Controller
    {
        public IConfiguration _configuration;
        private readonly TravelContext _context;
        public PhanVungController(IConfiguration configuration, TravelContext context)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpGet]
        [Route("get_phanvung")]
        [ActionName("getPhanvung")]
        public async Task<IActionResult> getPhanvung()
        {

            try
            {
                List<PhanVung> phanVungs = _context.PhanVungs.Where(t => t.TrangThai == 1).ToList();
                return Ok(new
                {
                    listPhanVung = phanVungs
                });
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "error occurred" });

            }

        }
    }
}
