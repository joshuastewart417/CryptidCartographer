using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptidCartographer.Repositories;
using CryptidCartographer.Models;

namespace CryptidCartographer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassificationController : ControllerBase
    {
        private readonly ICryptidRepository _cryptidRepo;
        private readonly IUserRepository _userRepo;
        private readonly IClassificationRepository _classRepo;
        private readonly ICryptidClassificationRepository _cryptidClassRepo;
        private readonly ICommentRepository _commentRepo;

        public ClassificationController(ICryptidRepository cryptidRepo, IUserRepository userRepo, IClassificationRepository classRepo, ICryptidClassificationRepository cryptidClassrepo, ICommentRepository commentrepo)
        {
            _cryptidRepo = cryptidRepo;
            _userRepo = userRepo;
            _classRepo = classRepo;
            _cryptidClassRepo = cryptidClassrepo;
            _commentRepo = commentrepo;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var classifications = _classRepo.GetAllClassifications();
            return Ok(classifications);
        }

        [HttpGet("{id}")]
        public IActionResult GetClassById(int id)
        {
            var classification = _classRepo.GetClassById(id);
            return Ok(classification);
        }

        [HttpPost]
        public IActionResult Post(Classification classification)
        {
            _classRepo.CreateClassification(classification);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _classRepo.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Classification classification)
        {
            _classRepo.Update(classification);
            return NoContent();
        }

    }
}
