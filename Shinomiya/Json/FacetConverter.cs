using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using static Shinomiya.Protos.Funimation.Response.Types;

namespace Shinomiya.Json
{
    internal class FacetConverter : JsonConverter<Facet>
    {
        public override Facet Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            // Facets come in the form ["name", count]

            if (reader.TokenType != JsonTokenType.StartArray)
                throw new JsonException();
            else if (reader.Read() && reader.TokenType != JsonTokenType.String)
                throw new JsonException();

            var name = reader.GetString();
            if (reader.Read() && reader.TokenType != JsonTokenType.Number)
                throw new JsonException();

            var count = reader.GetInt32();
            if (reader.Read() && reader.TokenType != JsonTokenType.EndArray)
                throw new JsonException();

            return new Facet
            {
                Name = name,
                Count = count
            };
        }

        public override void Write(Utf8JsonWriter writer, Facet value, JsonSerializerOptions options)
        {
            writer.WriteStartArray();
            writer.WriteStringValue(value.Name);
            writer.WriteNumberValue(value.Count);
            writer.WriteEndArray();
        }
    }
}
