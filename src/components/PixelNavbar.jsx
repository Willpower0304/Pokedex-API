import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PixelNavbar() {
  const tabs = ["Home", "Data", "Info", "Contact"];
  const paths = ["/", "/data", "/info", "/contact"];
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentIndex = paths.indexOf(location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname]);

  const handlePrev = () => {
    setActiveIndex((prev) => {
      const newIndex = prev === 0 ? tabs.length - 1 : prev - 1;
      navigate(paths[newIndex]);
      return newIndex;
    });
  };

  const handleNext = () => {
    setActiveIndex((prev) => {
      const newIndex = prev === tabs.length - 1 ? 0 : prev + 1;
      navigate(paths[newIndex]);
      return newIndex;
    });
  };

  const handleTabClick = (index) => {
    setActiveIndex(index);
    navigate(paths[index]);
  };

  return (
    <div className="w-full flex items-center justify-center bg-[#eb0000] py-2 px-4 border-t-4 border-b-4 border-black shadow-[inset_0_-2px_0_#c90000] gap-3">
      <button
        onClick={handlePrev}
        className="bg-[#c0c0c0] border-3 border-red text-black font-bold px-3 py-1 mx-1 active:translate-y-[1px] shadow-[2px_2px_0_#000]"
      >
        {"<"}
      </button>

      <div className="flex space-x-2 gap-3">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`px-5 py-1 text-sm font-bold uppercase border-2 ${
              activeIndex === index
                ? "bg-[#ffffff] text-black border-Black shadow-[2px_2px_0_#000]"
                : "bg-[#c0c0c0] text-gray-500 border-gray-500 shadow-[2px_2px_0_#000] hover:bg-[#e0e0e0]"
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
