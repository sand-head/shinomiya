using System;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Shinomiya.Json
{
    public class DateJoinedDateTimeConverter : JsonConverter<DateTime>
    {
        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            return DateTime.Parse(reader.GetString());
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            var formatInfo = new DateTimeFormatInfo
            {
                DateSeparator = "-"
            };

            writer.WriteStringValue(value.ToString("G", formatInfo));
        }
    }
}
