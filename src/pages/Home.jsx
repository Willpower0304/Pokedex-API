import PixelNavbar from "../components/PixelNavbar";
export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-startmin-h-screen bg-gray text-gray-800 gap-10">
      <PixelNavbar />
      <div className="text-3xl font-bold mt-10">
        Welcome to the Pokemon App!
      </div>
    </div>
  );
};
