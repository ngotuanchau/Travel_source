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
                    sd.id = diadiem.Id;
                    sd.tendiadiem = diadiem.Ten;
                    sd.sotour = diaDiem_Tours.Count;
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
    }
}
