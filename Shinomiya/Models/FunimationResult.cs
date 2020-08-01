using System.Collections.Generic;
using System.Linq;
using static Shinomiya.Protos.Funimation.Response.Types;

namespace Shinomiya.Models
{
    public class FunimationResult<TItem>
    {
        public IReadOnlyDictionary<string, Facet[]> Facets { get; set; } = new Dictionary<string, Facet[]>();
        public IReadOnlyList<TItem> Items { get; set; } = new List<TItem>();

        public int Count { get; set; }
        public int Limit { get; set; }
        public int Offset { get; set; }
        public int Total { get; set; }

        public IDictionary<string, FacetList> ToFacetList()
        {
            return Facets.ToDictionary(facet => facet.Key, facet =>
            {
                var facetList = new FacetList();
                facetList.Value.AddRange(facet.Value);
                return facetList;
            });
        }
    }
}
