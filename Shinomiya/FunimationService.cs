using Shinomiya.UI.Shared.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Shinomiya.UI.Shared
{
    public class FunimationService
    {
        private readonly HttpClient _client;

        public FunimationService(HttpClient client)
        {
            _client.BaseAddress = new Uri("https://prod-api-funimationnow.dadcdigital.com/api/");
            _client = client;
        }

        public Task<FunimationEpisode> GetEpisodes(int titleId, int limit)
        {
            throw new NotImplementedException();
        }
    }
}
