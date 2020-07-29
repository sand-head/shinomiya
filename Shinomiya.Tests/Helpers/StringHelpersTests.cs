using Shinomiya.Helpers;
using System.Linq;
using Xunit;

namespace Shinomiya.Tests.Helpers
{
    public class StringHelpersTests
    {
        [Theory]
        [InlineData("Toradora!",
            "Toradora!")]
        [InlineData("Kaguya-sama: Love is War",
            "Kaguya-sama:",
            "Love is War")]
        [InlineData("A Certain Scientific Accelerator",
            "A Certain",
            "Scientific Accelerator")]
        [InlineData("Senki Zesshou Symphogear G: In the Distance, That Day, When the Star Became Music...",
            "Senki",
            "Zesshou Symphogear",
            "G: In the Distance,",
            "That Day, When the",
            "Star Became Music...")]
        public void WrapBottomToTop_Title_ReturnsExpectedWrap(string title, params string[] expectedTitle)
        {
            var actualTitle = StringHelpers.WrapBottomToTop(title, maxChars: 23).ToList();

            Assert.Equal(expectedTitle, actualTitle);
        }

    }
}
