using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptidCartographer.Models;
using CryptidCartographer.Repositories;

namespace CryptidCartographer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICryptidRepository _cryptidRepo;
        private readonly IClassificationRepository _classRepo;
        private readonly ICryptidClassificationRepository _cryptidClassRepo;
        private readonly ICommentRepository _commentRepo;
        private readonly IUserRepository _userRepo;


        public CommentController(ICryptidRepository cryptidRepo, IClassificationRepository classRepo, ICryptidClassificationRepository cryptidClassRepo, ICommentRepository commentRepo, IUserRepository userRepo)
        {
            _cryptidRepo = cryptidRepo;
            _classRepo = classRepo;
            _cryptidClassRepo = cryptidClassRepo;
            _commentRepo = commentRepo;
            _userRepo = userRepo;
        }

        [HttpGet("GetCommentsByCryptidId/{id}")]
        public IActionResult GetCommentsByCryptidId(int id)
        {
            var comments = _commentRepo.GetCommentsByCryptidId(id);
            return Ok(comments);
        }

        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            comment.DateCreated = DateTime.Now;

            _commentRepo.Add(comment);

            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentRepo.Update(comment);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _commentRepo.Delete(id);
        }
    }
}
