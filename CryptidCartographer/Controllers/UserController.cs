using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptidCartographer.Repositories;
using CryptidCartographer.Models;

namespace CryptidCartographer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        public UserController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return Ok(_userRepo.GetAllUsers());
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserByFirebase(string firebaseUserId)
        {
            return Ok(_userRepo.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var user = _userRepo.GetByFirebaseUserId(firebaseUserId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok();
        }


        [HttpGet("GetUserById/{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userRepo.GetUserById(id);
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _userRepo.Add(user);
            return CreatedAtAction(
                nameof(GetUserByFirebase),
                new { firebaseUserId = user.FirebaseUserId },
                user);
        }

    }
}
