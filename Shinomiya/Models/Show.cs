using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using static Shinomiya.Protobuf.Funimation.Response.Types;

namespace Shinomiya.Models
{
    public class Show
    {
        public int ItemId { get; set; }
        public string Title { get; set; }
        public ShowSynopsis Synopsis { get; set; }
        public string[] Genres { get; set; }
        public ShowTitleImages TitleImages { get; set; }
        public double StarRating { get; set; }

        // gonna put this here so I don't forget:
        // "avod" refers to VODs with "Basic" level access
        // "svod" refers to VODs with "Premium" level access
    }

    public class ShowTitleImages
    {
        public string ShowThumbnail { get; set; }
        public string ApplePosterCover { get; set; }
        public string ShowLogo { get; set; }
        // todo: add the rest, maybe

        public string GetAdjustedShowThumbnail(string crop = "fill", int quality = 60, int width = 280, int height = 280) =>
            ShowThumbnail.Replace("image/upload/", $"image/upload/c_{crop},q_{quality},w_{width},h_{height}/");
    }

    public class ShowSynopsis
    {
        [JsonPropertyName("short-synopsis")]
        public string ShortSynopsis { get; set; }
        [JsonPropertyName("medium-synopsis")]
        public string MediumSynopsis { get; set; }
        [JsonPropertyName("long-synopsis")]
        public string LongSynopsis { get; set; }
        [JsonPropertyName("full-synopsis")]
        public string FullSynopsis { get; set; }
    }

    public class ShowFacets
    {
        public ItemFacet[] TxDate { get; set; }
        public ItemFacet[] Genres { get; set; }
        public ItemFacet[] Audio { get; set; }
        public ItemFacet[] Type { get; set; }

        public Dictionary<string, FacetList> ToGrpcFacets()
        {
            // this just goes to show that I should manually parse facets to a dictionary in the JsonConverter...
            var facets = new Dictionary<string, FacetList>();

            var txDate = new FacetList();
            txDate.Value.AddRange(TxDate.Select(t => new Facet
            {
                Name = t.Name,
                Count = t.Count
            }));
            facets.Add("TxDate", txDate);

            var genres = new FacetList();
            genres.Value.AddRange(Genres.Select(t => new Facet
            {
                Name = t.Name,
                Count = t.Count
            }));
            facets.Add("Genres", genres);

            var audio = new FacetList();
            audio.Value.AddRange(Audio.Select(t => new Facet
            {
                Name = t.Name,
                Count = t.Count
            }));
            facets.Add("Audio", audio);

            var type = new FacetList();
            type.Value.AddRange(Type.Select(t => new Facet
            {
                Name = t.Name,
                Count = t.Count
            }));
            facets.Add("Type", type);

            return facets;
        }
    }
}
