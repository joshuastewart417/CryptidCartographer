using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptidCartographer.Models;
using CryptidCartographer.Repositories;

namespace CryptidCartographer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CryptidController : ControllerBase
    {
        private readonly ICryptidRepository _cryptidRepo;
        public CryptidController(ICryptidRepository cryptidRepo)
        {
            _cryptidRepo = cryptidRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_cryptidRepo.GetAll());
        }
    }
}
