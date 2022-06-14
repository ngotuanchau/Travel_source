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
                return Ok(new
                {
                    listDiaDiem = diaDiems
                });
            }
            catch (Exception)
            {
                
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "error occurred" });

            }

        }
    }
}
