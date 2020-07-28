using System.Collections.Generic;

namespace Shinomiya.Models
{
    public class FunimationResult<TItem, TFacet>
    {
        public TFacet Facets { get; set; }
        public List<TItem> Items { get; set; }

        public int Count { get; set; }
        public int Limit { get; set; }
        public int Offset { get; set; }
        public int Total { get; set; }
    }
}
