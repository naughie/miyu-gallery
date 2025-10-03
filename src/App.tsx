import { ExternalLink } from "lucide-react";
import { lazy, Suspense } from "react";
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
  if (!resp.ok) {
    throw new Error("Could not fetch the image profiles");
  }
  const meta = (await resp.json()) as ImageMeta[];
  return meta;
};

const ImageList = lazy(async () => {
  const images = await getImages();
  return {
    default: () => {
      return (
        <>
          {images.map((song) => (
            <PhotoGrid
              key={song.dir}
              songTitle={song.title}
              imageUrls={song.files.map(
                (file) => `https://miyu-images.naughie.com${file}`,
              )}
            />
          ))}
        </>
      );
    },
  };
});

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <h2 className="text-2xl md:text-3xl text-center text-dark-pink font-bold mb-6 mt-6">
          <a
            href="https://miyu-slideshow.naughie.com/"
            className="flex justify-center items-baseline gap-2"
          >
            - <span>Slideshow</span>
            <ExternalLink />-
          </a>
        </h2>
        <Suspense fallback={<div />}>
          <ImageList />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
