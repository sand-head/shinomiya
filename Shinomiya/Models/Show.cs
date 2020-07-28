using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Shinomiya.Models
{
    public class Show
    {
        public int ItemId { get; set; }
        public string Title { get; set; }
        public string[] Genres { get; set; }
        public ShowTitleImages TitleImages { get; set; }
        public double StarRating { get; set; }
        public ShowSynopsis Synopsis { get; set; }
    }

    public class ShowTitleImages
    {
        public string ShowThumbnail { get; set; }
        public string ApplePosterCover { get; set; }
        public string ShowLogo { get; set; }
        // todo: add the rest, maybe
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
}
