using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Data;
using Travel.Serialize;
using Travel.Models;
using Microsoft.AspNetCore.Authorization;

namespace Travel.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AnhController : Controller
    {
        public IConfiguration _configuration;
        private readonly TravelContext _context;
        public AnhController(IConfiguration configuration, TravelContext context)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "Business")]
        [ActionName("createAnh")]
        public async Task<IActionResult> createAnh(update_anh_serialize update_Anh_Serialize)
        {
            try
            {
                
                foreach (var anh in update_Anh_Serialize.Anhs)
                {
                    var Anhtour = new AnhTour();
                    Anhtour.TourId = anh.idtour;
                    Anhtour.Anh = anh.tenanh;
                    Anhtour.TrangThai = 1;

                    _context.Add(Anhtour);
                    _context.SaveChanges();
                }    
                _context.SaveChanges();
                return Ok(new { message = "success" });
            }
            catch (BadHttpRequestException)
            {
                return BadRequest("Bad request");
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
