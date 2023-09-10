import { blueCoefficient, greenCoefficient, redCoefficient } from "utils/constants";
import { greyscaleCanvas, greyscaleCtx, greyscaleImg, greyscaleInput } from "utils/elements";
import { ImageExtension, ImageType } from "utils/types";

export class GreyscaleConverter {
  private imageExtension: string | undefined;

  public getImageExtension = (): string | undefined => this.imageExtension;

  private setImageExtension = (imageExtension: string): void => {
    this.imageExtension = imageExtension;
  };

  constructor() {
    this.bindListeners();
  }

  private handleImageLoad = (_event: Event): void => {
    // Set canvas dimensions to match image
    greyscaleCanvas.width = greyscaleImg.width;
    greyscaleCanvas.height = greyscaleImg.height;

    // Draw image onto canvas
    greyscaleCtx.drawImage(greyscaleImg, 0, 0);

    // Get image data
    const imageData = greyscaleCtx.getImageData(0, 0, greyscaleCanvas.width, greyscaleCanvas.height);
    const data = imageData.data;

    // Convert each pixel to greyscale
    for (let i = 0; i < data.length; i += 4) {
      const grey = data[i] * redCoefficient + data[i + 1] * greenCoefficient + data[i + 2] * blueCoefficient;
      data[i] = grey; // red
      data[i + 1] = grey; // green
      data[i + 2] = grey; // blue
    }

    // Put modified image data back onto canvas
    greyscaleCtx.putImageData(imageData, 0, 0);
  };

  private handleChange = (event: Event): void => {
    if (!(event.target instanceof HTMLInputElement)) return;

    if (!event.target.files) return;

    switch (event.target.files[0].type) {
      case ImageType.Png:
        this.setImageExtension(ImageExtension.Png);
        break;
      case ImageType.Jpeg:
        this.setImageExtension(ImageExtension.Jpeg);
        break;
      default:
        break;
    }

    if (!this.getImageExtension()) {
      alert("Invalid image type");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      greyscaleImg.src = reader.result as string;
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  private bindListeners = (): void => {
    greyscaleInput.addEventListener("change", this.handleChange);
    greyscaleImg.addEventListener("load", this.handleImageLoad);

    window.addEventListener("unload", this.handleUnload);
  };

  private handleUnload = (): void => {
    greyscaleInput.removeEventListener("change", this.handleChange);
    greyscaleImg.removeEventListener("load", this.handleImageLoad);

    window.removeEventListener("unload", this.handleUnload);
  };
}
