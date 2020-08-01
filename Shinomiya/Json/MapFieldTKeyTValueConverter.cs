using Google.Protobuf.Collections;
using System;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using Type = System.Type;

namespace Shinomiya.Json
{
    public class MapFieldTKeyTValueConverter : JsonConverterFactory
    {
        public override bool CanConvert(Type typeToConvert)
        {
            if (!typeToConvert.IsGenericType) return false;
            if (typeToConvert.GetGenericTypeDefinition() != typeof(MapField<,>)) return false;
            return typeToConvert.GetGenericArguments()[0].IsValueType && typeToConvert.GetGenericArguments()[1].IsValueType;
        }

        public override JsonConverter CreateConverter(Type typeToConvert, JsonSerializerOptions options)
        {
            var fieldType = typeToConvert.GetGenericArguments()[0];

            return (JsonConverter)Activator.CreateInstance(
                typeof(InnerMapFieldConverter<,>).MakeGenericType(fieldType),
                BindingFlags.Instance | BindingFlags.Public,
                binder: null,
                args: new object[] { options },
                culture: null);
        }

        private class InnerMapFieldConverter<TKey, TValue> : JsonConverter<MapField<TKey, TValue>>
        {
            private readonly JsonConverter<TKey> _keyConverter;
            private readonly JsonConverter<TValue> _valueConverter;
            private readonly Type _keyType;
            private readonly Type _valueType;

            public InnerMapFieldConverter(JsonSerializerOptions options)
            {
                _keyConverter = (JsonConverter<TKey>)options.GetConverter(typeof(TKey));
                _valueConverter = (JsonConverter<TValue>)options.GetConverter(typeof(TValue));
                _keyType = typeof(TKey);
                _valueType = typeof(TValue);
            }

            public override MapField<TKey, TValue> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
            {
                if (reader.TokenType != JsonTokenType.StartObject)
                    throw new JsonException();

                var mapField = new MapField<TKey, TValue>();

                while (reader.Read())
                {
                    if (reader.TokenType == JsonTokenType.EndObject)
                        return mapField;
                    if (reader.TokenType != JsonTokenType.PropertyName)
                        throw new JsonException();

                    TKey key;
                    if (_keyConverter != null)
                    {
                        reader.Read();
                        key = _keyConverter.Read(ref reader, _keyType, options);
                    }
                    else
                    {
                        key = JsonSerializer.Deserialize<TKey>(ref reader, options);
                    }

                    TValue value;
                    if (_valueConverter != null)
                    {
                        reader.Read();
                        value = _valueConverter.Read(ref reader, _valueType, options);
                    }
                    else
                    {
                        value = JsonSerializer.Deserialize<TValue>(ref reader, options);
                    }

                    mapField.Add(key, value);
                }

                throw new JsonException();
            }

            public override void Write(Utf8JsonWriter writer, MapField<TKey, TValue> value, JsonSerializerOptions options)
            {
                // we shouldn't ever want to serialize this to JSON, for obvious reasons
                throw new NotImplementedException();
            }
        }
    }
}
