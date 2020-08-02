﻿using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Shinomiya.Server.Controllers
{
    [ApiController, Route("[controller]")]
    public class FunimationController : ControllerBase
    {
        private readonly IFunimationApi _funimation;

        public FunimationController(IFunimationApi funimation)
        {
            _funimation = funimation;
        }

        [HttpGet("shows")]
        public async Task<ActionResult> GetShows()
        {
            return Ok(await _funimation.GetShowsAsync());
        }

        [HttpGet("episodes")]
        public async Task<ActionResult> GetEpisodes(int titleId)
        {
            return Ok(await _funimation.GetEpisodesAsync(titleId));
        }
    }
}
