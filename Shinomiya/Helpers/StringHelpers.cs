using System;
using System.Collections.Generic;

namespace Shinomiya.Helpers
{
    public static class StringHelpers
    {
        public static IEnumerable<string> WrapBottomToTop(string title, int maxChars = 23)
        {
            var wrappedTitle = new List<string>();

            var remainingTitle = title;
            while (remainingTitle.Length > 0)
            {
                if (remainingTitle.Length <= maxChars)
                {
                    wrappedTitle.Add(remainingTitle);
                    break;
                }

                var wrapBounds = remainingTitle.Length - Math.Min(maxChars, remainingTitle.Length);
                var nextSpace = remainingTitle.IndexOf(' ', wrapBounds);
                var nextIndex = nextSpace == -1 ? remainingTitle.Length : nextSpace;
                var section = remainingTitle[(nextIndex + 1)..];
                wrappedTitle.Add(section);
                remainingTitle = remainingTitle[..nextIndex];
            }

            wrappedTitle.Reverse();
            return wrappedTitle;
        }
    }
}
