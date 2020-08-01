using Google.Protobuf.Collections;
using System;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Shinomiya.Json
{
    public class RepeatedFieldTConverter : JsonConverterFactory
    {
        public override bool CanConvert(Type typeToConvert)
        {
            if (!typeToConvert.IsGenericType) return false;
            if (typeToConvert.GetGenericTypeDefinition() != typeof(RepeatedField<>)) return false;
            return typeToConvert.GetGenericArguments()[0].IsValueType;
        }

        public override JsonConverter CreateConverter(Type typeToConvert, JsonSerializerOptions options)
        {
            var fieldType = typeToConvert.GetGenericArguments()[0];

            return (JsonConverter)Activator.CreateInstance(
                typeof(InnerRepeatedFieldConverter<>).MakeGenericType(fieldType),
                BindingFlags.Instance | BindingFlags.Public,
                binder: null,
                args: new object[] { options },
                culture: null);
        }

        private class InnerRepeatedFieldConverter<TValue> : JsonConverter<RepeatedField<TValue>>
        {
            private readonly JsonConverter<TValue> _valueConverter;
            private readonly Type _valueType;

            public InnerRepeatedFieldConverter(JsonSerializerOptions options)
            {
                _valueConverter = (JsonConverter<TValue>)options.GetConverter(typeof(TValue));
                _valueType = typeof(TValue);
            }

            public override RepeatedField<TValue> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
            {
                if (reader.TokenType != JsonTokenType.StartArray)
                    throw new JsonException();

                var repeatedField = new RepeatedField<TValue>();

                while (reader.Read())
                {
                    if (reader.TokenType == JsonTokenType.EndArray)
                        return repeatedField;

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

                    repeatedField.Add(value);
                }

                throw new JsonException();
            }

            public override void Write(Utf8JsonWriter writer, RepeatedField<TValue> value, JsonSerializerOptions options)
            {
                // we shouldn't ever want to serialize this to JSON, for obvious reasons
                throw new NotImplementedException();
            }
        }
    }
}
