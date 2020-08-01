using Google.Protobuf.Collections;
using Shinomiya.Json;
using System.Collections.Generic;
using System.Text.Json;
using Xunit;

namespace Shinomiya.Tests.Json
{
    public class MapFieldTKeyTValueConverterTests
    {
        [Fact]
        public void Read_StringTKey_ReturnsExpectedMapField()
        {
            var options = new JsonSerializerOptions();
            options.Converters.Add(new MapFieldTKeyTValueConverter());
            var expectedDict = new Dictionary<string, string>
            {
                ["short-synopsis"] = "Testing",
                ["medium-synopsis"] = "This is a test"
            };

            var mapFieldJson = JsonSerializer.Serialize(expectedDict);
            var mapField = JsonSerializer.Deserialize<MapField<string, string>>(mapFieldJson, options);

            Assert.Equal(expectedDict, mapField);
        }
    }
}
