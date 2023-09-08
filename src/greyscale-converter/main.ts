import { ImageExtension, ImageType } from "utils/constants";
import { greyscaleImg, greyscaleInput } from "utils/elements";

export class GreyscaleConverter {
  private imageExtension: string | undefined;

  public getImageExtension = (): string | undefined => this.imageExtension;

  private setImageExtension = (imageExtension: string): void => {
    this.imageExtension = imageExtension;
  };

  constructor() {
    this.bindListeners();
  }

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

    window.addEventListener("unload", this.handleUnload);
  };

  private handleUnload = (): void => {
    greyscaleInput.removeEventListener("change", this.handleChange);

    window.removeEventListener("unload", this.handleUnload);
  };
}
