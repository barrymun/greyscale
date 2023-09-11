import { blueCoefficient, greenCoefficient, redCoefficient } from "utils/constants";
import { colourCanvas, convertBtn, downloadBtn, greyscaleCanvas, greyscaleImg, greyscaleInput } from "utils/elements";
import { toggleBtnVisibility } from "utils/helpers";
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

  private clearCanvas = ({ targetCanvas }: { targetCanvas: HTMLCanvasElement }): void => {
    // get canvas context
    const ctx = targetCanvas.getContext("2d")!;

    ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
  };

  private convertToGreyscale = ({
    sourceCanvas,
    targetCanvas,
  }: {
    sourceCanvas: HTMLCanvasElement;
    targetCanvas: HTMLCanvasElement;
  }): void => {
    // get canvas context
    const ctx = targetCanvas.getContext("2d")!;

    // source and target canvas dimensions must match
    targetCanvas.width = sourceCanvas.width;
    targetCanvas.height = sourceCanvas.height;

    // copy source canvas onto target canvas
    ctx.drawImage(sourceCanvas, 0, 0);

    // Get image data
    const imageData = ctx.getImageData(0, 0, targetCanvas.width, targetCanvas.height);
    const data = imageData.data;

    // Convert each pixel to greyscale
    for (let i = 0; i < data.length; i += 4) {
      const grey = data[i] * redCoefficient + data[i + 1] * greenCoefficient + data[i + 2] * blueCoefficient;
      data[i] = grey; // red
      data[i + 1] = grey; // green
      data[i + 2] = grey; // blue
    }

    // Put modified image data back onto canvas
    ctx.putImageData(imageData, 0, 0);
  };

  private convertImageToCanvas = ({
    img,
    targetCanvas,
  }: {
    img: HTMLImageElement;
    targetCanvas: HTMLCanvasElement;
  }): void => {
    // Get canvas context
    const ctx = targetCanvas.getContext("2d")!;

    // Set canvas dimensions to match the image
    targetCanvas.width = img.width;
    targetCanvas.height = img.height;

    // Draw the image onto the canvas
    ctx.drawImage(img, 0, 0, img.width, img.height);
  };

  private resizeCanvas = ({
    targetCanvas,
    newWidth,
    newHeight,
  }: {
    targetCanvas: HTMLCanvasElement;
    newWidth: number;
    newHeight: number;
  }): void => {
    // Get canvas context
    const ctx = targetCanvas.getContext("2d")!;

    // Step 1: Create a temporary canvas and context
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d")!;
    tempCanvas.width = targetCanvas.width;
    tempCanvas.height = targetCanvas.height;

    // Copy the content of the original canvas onto the temporary canvas
    tempCtx.drawImage(targetCanvas, 0, 0);

    // Step 2: Resize the original canvas
    targetCanvas.width = newWidth;
    targetCanvas.height = newHeight;

    // Step 3: Draw the content of the temporary canvas back onto the resized original canvas
    ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, newWidth, newHeight);
  };

  private handleImageLoad = (_event: Event): void => {
    toggleBtnVisibility({
      btn: downloadBtn,
      isVisible: false,
    });
    this.clearCanvas({
      targetCanvas: greyscaleCanvas,
    });
    this.convertImageToCanvas({
      img: greyscaleImg,
      targetCanvas: colourCanvas,
    });
    // const ratio: number = colourCanvas.width / colourCanvas.height;
    // const newWidth: number = window.innerWidth;
    // const newHeight: number = newWidth / ratio;
    // this.resizeCanvas({
    //   targetCanvas: colourCanvas,
    //   newWidth,
    //   newHeight,
    // });

    toggleBtnVisibility({
      btn: convertBtn,
      isVisible: true,
    });
  };

  private handleConvertBtnClick = (): void => {
    this.convertToGreyscale({
      sourceCanvas: colourCanvas,
      targetCanvas: greyscaleCanvas,
    });

    toggleBtnVisibility({
      btn: downloadBtn,
      isVisible: true,
    });
  };

  private bindListeners = (): void => {
    greyscaleInput.addEventListener("change", this.handleChange);
    greyscaleImg.addEventListener("load", this.handleImageLoad);
    convertBtn.addEventListener("click", this.handleConvertBtnClick);

    window.addEventListener("unload", this.handleUnload);
  };

  private handleUnload = (): void => {
    greyscaleInput.removeEventListener("change", this.handleChange);
    greyscaleImg.removeEventListener("load", this.handleImageLoad);
    convertBtn.removeEventListener("click", this.handleConvertBtnClick);

    window.removeEventListener("unload", this.handleUnload);
  };
}
