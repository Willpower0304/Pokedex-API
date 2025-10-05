import PixelNavbar from "../components/PixelNavbar";
export const Info = () => {
  return (
    <div className="flex flex-col items-center justify-startmin-h-screen bg-gray text-gray-800 gap-10">
      <PixelNavbar />
      <div className="text-3xl font-bold mt-10">Info of the page</div>
    </div>
  );
};
