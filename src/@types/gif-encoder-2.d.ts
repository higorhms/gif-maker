declare module 'gif-encoder-2' {
  class GifEncoder {
    constructor(width: number, height: number);
    start(): void;
    setRepeat(repeat: number): void;
    setDelay(delay: number): void;
    setQuality(quality: number): void;
    addFrame(data: any): void;
    finish(): void;
    createReadStream(): NodeJS.ReadableStream;
  }

  export = GifEncoder;
}