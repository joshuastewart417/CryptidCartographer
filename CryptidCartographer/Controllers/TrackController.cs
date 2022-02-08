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
    public class TrackController : ControllerBase
    {
        private const string Track = "{UserId, CryptidId}";
        private readonly ICryptidRepository _cryptidRepo;
        private readonly ICryptidClassificationRepository _cryptidClassRepo;
        private readonly IClassificationRepository _classRepo;
        private readonly ICommentRepository _commentRepo;
        private readonly IUserRepository _userRepo;
        private readonly ITrackRepository _trackRepo;

        public TrackController(ITrackRepository trackRepo, ICryptidRepository cryptidRepo, ICryptidClassificationRepository cryptidClassRepo, IClassificationRepository classRepo, ICommentRepository commentRepo, IUserRepository userRepo)
        {
            _cryptidRepo = cryptidRepo;
            _cryptidClassRepo = cryptidClassRepo;
            _classRepo = classRepo;
            _commentRepo = commentRepo;
            _userRepo = userRepo;
            _trackRepo = trackRepo;
        }

        [HttpPost]
        public IActionResult Post(Track track)
        {
            _trackRepo.Add(track);
            return NoContent();
        }

        [HttpPut]
        public IActionResult Put(Track track)
        {
            _trackRepo.Update(track);
            return NoContent();
        }


        [HttpDelete]
        public IActionResult Delete(Track track)
        {
            _trackRepo.Delete(track);
            return NoContent();
        }

    }
}
