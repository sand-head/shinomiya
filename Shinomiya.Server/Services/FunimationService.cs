using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Shinomiya.Protobuf.Funimation;
using System.Linq;
using System.Threading.Tasks;
using static Shinomiya.Protobuf.Funimation.Show.Types;

namespace Shinomiya.Server.Services
{
    public class FunimationService : Funimation.FunimationBase
    {
        private readonly IFunimationApi _api; 

        public FunimationService(IFunimationApi api)
        {
            _api = api;
        }

        public override async Task<Response> GetShows(GetShowsRequest request, ServerCallContext context)
        {
            var apiResponse = await _api.GetShowsAsync(request.Limit, request.Offset);

            var grpcResponse = new Response
            {
                Count = apiResponse.Count,
                Limit = apiResponse.Limit,
                Offset = apiResponse.Offset,
                Total = apiResponse.Total,
            };
            grpcResponse.Facets.Add(apiResponse.Facets.ToGrpcFacets());
            grpcResponse.Items.AddRange(apiResponse.Items.Select(s =>
            {
                var showMsg = new Show
                {
                    ItemId = s.ItemId,
                    Title = s.Title,
                    StarRating = s.StarRating,
                    Synopsis = new Synopsis
                    {
                        ShortSynopsis = s.Synopsis.ShortSynopsis ?? string.Empty,
                        MediumSynopsis = s.Synopsis.MediumSynopsis ?? string.Empty,
                        LongSynopsis = s.Synopsis.LongSynopsis ?? string.Empty,
                        FullSynopsis = s.Synopsis.FullSynopsis ?? string.Empty
                    },
                    TitleImages = new TitleImages
                    {
                        ShowLogo = s.TitleImages.ShowLogo ?? string.Empty,
                        ShowThumbnail = s.TitleImages.ShowThumbnail
                    }
                };
                showMsg.Genres.AddRange(s.Genres);
                return Any.Pack(showMsg);
            }));

            return grpcResponse;
        }
    }
}
