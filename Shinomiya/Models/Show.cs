using System.Collections.ObjectModel;
using System.Text.Json.Serialization;

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
    }
}
