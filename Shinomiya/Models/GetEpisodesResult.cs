using System;
using System.Collections.Generic;
using System.Text;

namespace Shinomiya.UI.Shared.Models
{
    public class GetEpisodesResult
    {
        public int Count { get; set; }
        public int Limit { get; set; }
        public int Offset { get; set; }
        public dynamic Items { get; set; }
        public dynamic Facets { get; set; }
        public int Total { get; set; }
    }
}
