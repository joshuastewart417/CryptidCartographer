using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using CryptidCartographer.Models;
using CryptidCartographer.Repositories;

namespace CryptidCartographer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CryptidClassificationController : ControllerBase
    {
        private readonly ICryptidRepository _cryptidRepo;
        private readonly ICryptidClassificationRepository _cryptidClassRepo;
        private readonly IClassificationRepository _classRepo;
        private readonly ICommentRepository _commentRepo;
        private readonly IUserRepository _userRepo;

        public CryptidClassificationController(ICryptidRepository cryptidRepo, ICryptidClassificationRepository cryptidClassRepo, IClassificationRepository classRepo, ICommentRepository commentRepo, IUserRepository userRepo)
        {
            _cryptidRepo = cryptidRepo;
            _cryptidClassRepo = cryptidClassRepo;
            _classRepo = classRepo;
            _commentRepo = commentRepo;
            _userRepo = userRepo;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var cryptidClass = _cryptidClassRepo.GetById(id);
            return Ok(cryptidClass);
        }

        [HttpGet("GetClassByCryptidId/{id}")]
        public IActionResult GetCryptidClass(int id)
        {
            var cryptidClass = _cryptidClassRepo.GetCryptidClassificationByCryptidId(id);
            return Ok(cryptidClass);
        }

        [HttpPost]
        public IActionResult Post(CryptidClassification cryptidClass)
        {
            _cryptidClassRepo.AddClassToCryptid(cryptidClass);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _cryptidClassRepo.Delete(id);
            return NoContent();
        }

        [HttpDelete("ClearCryptidClass/{id}")]
        public IActionResult ClearCryptidClass(int id)
        {
            _cryptidClassRepo.ClearClassificationForCryptid(id);
            return NoContent();
        }
    }
}
