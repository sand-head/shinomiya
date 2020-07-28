using Microsoft.AspNetCore.WebUtilities;
using Shinomiya.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace Shinomiya
{
    public class FunimationService
    {
        private readonly HttpClient _client;

        public FunimationService(HttpClient client)
        {
            client.BaseAddress = new Uri("https://prod-api-funimationnow.dadcdigital.com/api/");
            _client = client;
        }

        public async Task<FunimationResult<Show, ShowFacets>> GetShowsAsync(int limit = 25, int offset = 0)
        {
            var url = QueryHelpers.AddQueryString("funimation/shows/", new Dictionary<string, string>
            {
                ["limit"] = limit.ToString(),
                ["offset"] = offset.ToString()
            });

            var response = await _client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<FunimationResult<Show, ShowFacets>>();
        }
    }
}
