﻿using Microsoft.AspNetCore.WebUtilities;
using Shinomiya.Json;
using Shinomiya.Models;
using Shinomiya.Protos.Funimation;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;

namespace Shinomiya
{
    public interface IFunimationApi
    {
        Task<LogInResult> LogInAsync(string email, string password);
        Task LogOutAsync();
        Task<FunimationResult<Show>> GetShowsAsync(int limit = 25, int offset = 0);
        Task<FunimationResult<Episode>> GetEpisodesAsync(int titleId, int limit = 25, int offset = 0);
        Task<FunimationResult<QueuedShow>> GetQueueAsync(int limit = 25, int offset = 0);
    }

    public class FunimationApi : IFunimationApi
    {
        private readonly HttpClient _client;
        private readonly JsonSerializerOptions _jsonOptions;

        public FunimationApi(HttpClient client)
        {
            if (client.BaseAddress == null) throw new ArgumentException("HttpClient must have a BaseAddress set.", nameof(client));
            _client = client;
            _jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            _jsonOptions.Converters.Add(new FacetConverter());
            _jsonOptions.Converters.Add(new RepeatedFieldTConverter());
        }

        /// <summary>
        /// Asynchronously logs in to Funimation with the given email and password, saving the returned token in the process.
        /// </summary>
        /// <param name="email">The email of the Funimation account.</param>
        /// <param name="password">The password of the Funimation account.</param>
        /// <returns>A <see cref="LogInResult"/> containing the full response, including user data.</returns>
        public async Task<LogInResult> LogInAsync(string email, string password)
        {
            var content = new FormUrlEncodedContent(new Dictionary<string, string>
            {
                ["username"] = email,
                ["password"] = password
            });

            var response = await _client.PostAsync("auth/login/", content);
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadFromJsonAsync<LogInResult>();
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Token", result.Token);
            return result;
        }

        /// <summary>
        /// Asynchronously logs out the currently logged in user.
        /// </summary>
        public async Task LogOutAsync()
        {
            var response = await _client.PostAsync("auth/logout/", null);
            response.EnsureSuccessStatusCode();
        }

        /// <summary>
        /// Asynchronously queries the API for a list of shows.
        /// </summary>
        /// <param name="limit">The number of shows to take, defaulting to 25.</param>
        /// <param name="offset">The number to offset the list by, defaulting to 0.</param>
        public async Task<FunimationResult<Show>> GetShowsAsync(int limit = 25, int offset = 0)
        {
            var url = QueryHelpers.AddQueryString("funimation/shows/", new Dictionary<string, string>
            {
                ["limit"] = limit.ToString(),
                ["offset"] = offset.ToString()
            });

            var response = await _client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<FunimationResult<Show>>(_jsonOptions);
        }

        /// <summary>
        /// Asynchronously queries the API for a section of a given show's episode list.
        /// </summary>
        /// <param name="titleId">The internal ID of the show.</param>
        /// <param name="limit">The number of episodes to take, defaulting to 25.</param>
        /// <param name="offset">The number to offset the list by, defaulting to 0.</param>
        public async Task<FunimationResult<Episode>> GetEpisodesAsync(int titleId, int limit = 25, int offset = 0)
        {
            var url = QueryHelpers.AddQueryString("funimation/episodes/", new Dictionary<string, string>
            {
                ["title_id"] = titleId.ToString(),
                ["limit"] = limit.ToString(),
                ["offset"] = offset.ToString()
            });

            var response = await _client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<FunimationResult<Episode>>();
        }

        /// <summary>
        /// Asynchronously queries the API for a section of a user's queue.
        /// Requires authentication via <see cref="LogInAsync(string, string)"/>.
        /// </summary>
        /// <param name="limit">The number of queued shows to take, defaulting to 25.</param>
        /// <param name="offset">The number to offset the list by, defaulting to 0.</param>
        public async Task<FunimationResult<QueuedShow>> GetQueueAsync(int limit = 25, int offset = 0)
        {
            var url = QueryHelpers.AddQueryString("source/funimation/queue/", new Dictionary<string, string>
            {
                ["limit"] = limit.ToString(),
                ["offset"] = offset.ToString()
            });

            var response = await _client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<FunimationResult<QueuedShow>>();
        }
    }
}