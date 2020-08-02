using System.Collections.Generic;

namespace Shinomiya.Models
{
    public class FunimationResult<TItem>
    {
        public IReadOnlyDictionary<string, ItemFacet[]> Facets { get; set; } = new Dictionary<string, ItemFacet[]>();
        public IReadOnlyList<TItem> Items { get; set; } = new List<TItem>();

        public int Count { get; set; }
        public int Limit { get; set; }
        public int Offset { get; set; }
        public int Total { get; set; }
    }
}
