using Microsoft.AspNetCore.Mvc;
using CryptidCartographer.Repositories;
using CryptidCartographer.Models;

namespace CryptidCartographer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : ControllerBase
    {
        private readonly IStateRepository _stateRepo;

        public StateController(IStateRepository stateRepo)
        {
            _stateRepo = stateRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_stateRepo.GetAllStates());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var state = _stateRepo.GetStateById(id);
            return Ok(state);
        }
    }
}
