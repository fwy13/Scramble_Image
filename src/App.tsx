import { useRef, useState } from "react";

const App = () => {
  const useCanvas = useRef<HTMLCanvasElement>(null);
  const [isRow, setRow] = useState<number>(10);
  const isScale = 0.5;
  const [isText, setText] = useState<string>("");
  const [isImages, setImages] = useState<HTMLImageElement[]>([]);
  const [isImageDownload, setImageDonwload] = useState<string>("");

  const renderImage = async () => {
    const img = isImages[0];
    const canvasDownload = document.createElement("canvas");
    canvasDownload.width = img.width;
    canvasDownload.height = img.height;
    const ctxDownload = canvasDownload.getContext("2d")!;

    const ctx = useCanvas.current!.getContext("2d")!;

    useCanvas.current!.width = img.width * isScale;
    useCanvas.current!.height = img.height * isScale;

    const sh = img.height / isRow;

    const intro = "#v1";
    const positionMap: {
      before: number;
      after: number;
    }[] = [];
    const listPosition: number[] = [];

    for (let i = 0; i < isRow; i++) {
      listPosition.push(i * sh);
    }
    for (let i = 0; i < isRow; i++) {
      const random_index = Math.floor(Math.random() * listPosition.length);
      positionMap.push({
        before: i * sh,
        after: listPosition[random_index],
      });
      listPosition.splice(random_index, 1);
    }
    let position_string = intro.split("") as any;
    positionMap.forEach((item) => {
      position_string.push(`|${item.before}-${item.after}`);
    });
    position_string = position_string.join("");
    setText(position_string);
    (position_string as string).split("|").forEach((item, i) => {
      if (i === 0) return;
      const [before, after] = item.split("-");
      ctx.drawImage(
        img,
        0,
        +before,
        img.width,
        sh,
        0,
        +after * isScale,
        useCanvas.current!.width,
        sh * isScale
      );
      ctxDownload.drawImage(
        img,
        0,
        +before,
        img.width,
        sh,
        0,
        +after,
        img.width,
        sh
      );
    });

    setImageDonwload(canvasDownload.toDataURL());

  };

  const inputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const image = files![0];

    const img = new Image();
    img.src = URL.createObjectURL(image);
    img.alt = image.name;
    await img.decode();
    let isRow = 10;

    while (img.height % isRow !== 0) {
      isRow += 1;
    }
    setRow(isRow);

    setImages([img]);
  };
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = isImageDownload;
    a.download = isImages[0].alt;
    a.click();
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-screen">
      {isImages.length > 0 ? (
        <div className="flex lg:flex-row flex-col gap-3">
          <div className="m-2 border-2 border-dashed rounded">
            <h1 className="bg-black text-white text-lg w-full text-center">
              Original Image
            </h1>
            <img
              src={isImages[0].src}
              width={isImages[0].width / 2}
              height={isImages[0].height / 2}
            />
          </div>
          <div className="m-2 border-2 border-dashed rounded">
            <h1 className="bg-black text-white text-lg w-full text-center">
              Scrambled Image
            </h1>
            <canvas
              ref={useCanvas}
              width={isImages[0].width / 2}
              height={isImages[0].height / 2}
            ></canvas>
          </div>
        </div>
      ) : (
        <div className="relative w-[300px] h-[200px] border-2 border-dashed mt-2 rounded">
          <input
            type="file"
            accept="image/*"
            className="absolute w-full h-full opacity-0"
            onChange={inputChange}
          />
          <label className="w-full h-full flex items-center justify-center">
            Drop your image here!
          </label>
        </div>
      )}
      {isImages.length > 0 && (
        <div className="flex flex-col w-full justify-center items-center">
          {isText.length > 0 && (
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                Key:{" "}
                <span className="border border-dashed px-2 py-1">{isText}</span>
              </div>
              <div
                className="flex justify-center items-center"
                onClick={handleDownload}
              >
                <button className="outline-none px-2 py-1 bg-green-400 rounded m-2 text-white">
                  Download Image
                </button>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span>Row Scramble (Default): </span>
            <input
              type="number"
              placeholder="Row scramble"
              value={isRow}
              max={100}
              className="border border-dashed rounded outline-none px-2 py-1 mt-1 w-20"
              onChange={(e) => setRow(+e.target.value)}
            />
          </div>
          <button
            onClick={renderImage}
            className="outline-none px-2 py-1 bg-blue-400 rounded m-2 text-white"
          >
            Render
          </button>
        </div>
      )}
    </div>
  );
};
export default App;
