using Google.Protobuf.Collections;
using Shinomiya.Json;
using System.Collections.Generic;
using System.Text.Json;
using Xunit;

namespace Shinomiya.Tests.Json
{
    public class RepeatedFieldTConverterTests
    {
        [Fact]
        public void Read_ReturnsExpectedRepeatedField()
        {
            var options = new JsonSerializerOptions();
            options.Converters.Add(new RepeatedFieldTConverter());
            var expectedList = new List<string>
            {
                "Testing",
                "This is a test"
            };

            var repeatedFieldJson = JsonSerializer.Serialize(expectedList);
            var repeatedField = JsonSerializer.Deserialize<RepeatedField<string>>(repeatedFieldJson, options);

            Assert.Equal(expectedList, repeatedField);
        }
    }
}
