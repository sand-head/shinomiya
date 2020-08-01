using static Shinomiya.Protos.Funimation.Show.Types;

namespace Shinomiya.Extensions
{
    public static class TitleImagesExtensions
    {
        public static string GetAdjustedShowThumbnail(this TitleImages titleImages, string crop = "fill", int quality = 60, int width = 280, int height = 280) =>
            titleImages.ShowThumbnail.Replace("image/upload/", $"image/upload/c_{crop},q_{quality},w_{width},h_{height}/");
    }
}
