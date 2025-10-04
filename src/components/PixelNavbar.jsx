import { useState } from "react";

export default function PixelNavbar() {
  const tabs = ["Home", "Info", "Data", "Contact"];
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? tabs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === tabs.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex items-center justify-center bg-[#8ecae6] py-2 px-4 border-t-4 border-b-4 border-black shadow-[inset_0_-2px_0_#5b9bd5] gap-3">
      <button
        onClick={handlePrev}
        className="bg-[#c0c0c0] border-3 border-black text-black font-bold px-3 py-1 mx-1 active:translate-y-[1px] shadow-[2px_2px_0_#000]"
      >
        {"<"}
      </button>

      <div className="flex space-x-2 gap-3">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-5 py-1 text-sm font-bold uppercase border-2 ${
              activeIndex === index
                ? "bg-[#ffffff] text-black border-black shadow-[2px_2px_0_#000]"
                : "bg-[#c0c0c0] text-gray-800 border-black shadow-[2px_2px_0_#000] hover:bg-[#e0e0e0]"
            }`}
            style={{ fontFamily: "Lucida Console, monospace" }}
          >
            {tab}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="bg-[#c0c0c0] border-3 border-black text-black font-bold px-3 py-1 mx-1 active:translate-y-[1px] shadow-[2px_2px_0_#000]"
      >
        {">"}
      </button>
    </div>
  );
}
