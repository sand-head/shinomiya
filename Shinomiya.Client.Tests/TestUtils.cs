using Google.Protobuf.WellKnownTypes;
using Shinomiya.Protos.Funimation;
using static Shinomiya.Protos.Funimation.Show.Types;

namespace Shinomiya.Client.Tests
{
    public static class TestUtils
    {
        public static Response GetFakeShows()
        {
            var response = new Response
            {
                Count = 1,
                Limit = 1,
                Offset = 0,
                Total = 1
            };
            var show = new Show
            {
                ItemId = 1,
                Title = "Hello World",
                StarRating = 7.76,
                TitleImages = new TitleImages
                {
                    ShowThumbnail = "https://cdn.myanimelist.net/images/anime/1395/102089l.jpg"
                },
                Synopsis = new Synopsis(),
            };
            show.Genres.Add("Sci-Fi");
            response.Items.Add(Any.Pack(show));
            return response;
        }
    }
}
