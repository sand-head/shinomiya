namespace Shinomiya.Models
{
    public class Episode
    {
        public string Title { get; set; }
        public string Synopsis { get; set; }
        public double StarRating { get; set; }
        public string[] Genres { get; set; }
        public string[] Audio { get; set; }
        // todo: add more when needed
    }

    public class EpisodeFacets
    {
        public ItemFacet[] TxDate { get; set; }
        public ItemFacet[] Genres { get; set; }
        public ItemFacet[] Audio { get; set; }
        public ItemFacet[] Type { get; set; }

        /// <summary>
        /// Availability in Great Britian.
        /// </summary>
        public ItemFacet[] GbAccess { get; set; }
        /// <summary>
        /// Availability in Ireland.
        /// </summary>
        public ItemFacet[] IeAccess { get; set; }
        /// <summary>
        /// Availability in New Zealand.
        /// </summary>
        public ItemFacet[] NzAccess { get; set; }
        /// <summary>
        /// Availability in the United States.
        /// </summary>
        public ItemFacet[] UsAccess { get; set; }
        /// <summary>
        /// Availability in Australia.
        /// </summary>
        public ItemFacet[] AuAccess { get; set; }
        /// <summary>
        /// Availability in Canada.
        /// </summary>
        public ItemFacet[] CaAccess { get; set; }
    }
}
