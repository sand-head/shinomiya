using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Shinomiya.Protos.Funimation;
using System.Linq;
using System.Threading.Tasks;

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
            grpcResponse.Facets.Add(apiResponse.ToFacetList());
            grpcResponse.Items.AddRange(apiResponse.Items.Select(s => Any.Pack(s)));

            return grpcResponse;
        }
    }
}
