using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Shinomiya.Server.Controllers
{
    [ApiController, Route("[controller]")]
    public class FunimationController : ControllerBase
    {
        private readonly FunimationService _funimation;

        public FunimationController(FunimationService funimation)
        {
            _funimation = funimation;
        }

        [HttpGet("shows")]
        public async Task<ActionResult> GetShows()
        {
            return Ok(await _funimation.GetShowsAsync());
        }
    }
}
