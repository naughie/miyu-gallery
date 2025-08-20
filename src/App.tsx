import { ExternalLink } from "lucide-react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PhotoGrid from "./components/PhotoGrid";

const getImages = async () => {
  type ImageMeta = {
    dir: string;
    title: string;
    files: string[];
  };

  const resp = await fetch("https://miyu-images.naughie.com/index.json");
  const meta = (await resp.json()) as ImageMeta[];
  return meta;
};
const images = await getImages();

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <h2 className="text-2xl md:text-3xl text-center text-dark-pink font-bold mb-6 mt-6">
          <a
            href="https://miyu-slideshow.vercel.app/"
            className="flex justify-center items-baseline gap-2"
          >
            - <span>Slideshow</span>
            <ExternalLink />-
          </a>
        </h2>
        {images.map((song) => (
          <PhotoGrid
            key={song.dir}
            songTitle={song.title}
            imageUrls={song.files.map(
              (file) => `https://miyu-images.naughie.com${file}`,
            )}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default App;
