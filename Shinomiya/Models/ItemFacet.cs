using Shinomiya.Json;
using System.Text.Json.Serialization;

namespace Shinomiya.Models
{
    [JsonConverter(typeof(ItemFacetConverter))]
    public class ItemFacet
    {
        public string Name { get; set; }
        public int Count { get; set; }
    }
}
