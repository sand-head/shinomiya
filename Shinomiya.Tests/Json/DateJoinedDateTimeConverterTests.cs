using Shinomiya.Json;
using System;
using System.Text.Json;
using Xunit;

namespace Shinomiya.Tests.Json
{
    public class DateJoinedDateTimeConverterTests
    {
        [Fact]
        public void Read_ReturnsExpectedDateTime()
        {
            var options = new JsonSerializerOptions();
            options.Converters.Add(new DateJoinedDateTimeConverter());
            var dateJoined = "04-02-2019 19:30:35";
            var dateJoinedJson = @"""" + dateJoined + @"""";
            var expected = new DateTime(2019, 4, 2, 19, 30, 35);

            var resultDateTime = JsonSerializer.Deserialize<DateTime>(dateJoinedJson, options);

            Assert.Equal(expected, resultDateTime);
        }

        [Fact]
        public void Write_ReturnsExpectedJsonValue()
        {
            var options = new JsonSerializerOptions();
            options.Converters.Add(new DateJoinedDateTimeConverter());
            var dateJoined = new DateTime(2019, 4, 2, 19, 30, 35);
            var expected = "04-02-2019 19:30:35";
            var expectedJson = @"""" + expected + @"""";

            var resultString = JsonSerializer.Serialize(dateJoined, options);

            Assert.Equal(expectedJson, resultString);
        }
    }
}
