using System;
using System.Text.Json.Serialization;

namespace Shinomiya.Models
{
    public class LogInResult
    {
        public string Token { get; set; }
        [JsonPropertyName("rlildup_cookie")]
        public string RlildupCookie { get; set; }
        public LogInUser User { get; set; }
        [JsonPropertyName("user_region")]
        public string UserRegion { get; set; }
    }

    public class LogInUser
    {
        public int Id { get; set; }
        [JsonPropertyName("first_name")]
        public string FirstName { get; set; }
        [JsonPropertyName("last_name")]
        public string LastName { get; set; }
        public string Email { get; set; }
        [JsonPropertyName("last_login_local")]
        public DateTime LastLoginLocal { get; set; }
        public string DisplayName { get; set; }
        public string Avatar { get; set; }
        public string DefaultLanguage { get; set; }
        [JsonPropertyName("last_login")]
        public DateTime LastLogin { get; set; }
        [JsonPropertyName("date_joined")]
        public DateTime DateJoined { get; set; }
    }
}
