import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [images, setImages] = useState([]);
  const [isImagesLoaded, setImagesLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input) {
      const generatedImages = await generateImage(input);
      if (generatedImages && generatedImages.length > 0) {
        setImagesLoaded(true);
        setImages(generatedImages);
        setSelectedImage(generatedImages[0]);
      }
    }
    setLoading(false);
  };

  const handleGenerateAnother = () => {
    setImagesLoaded(false);
    setImages([]);
    setSelectedImage(null);
    setInput("");
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center px-4"
    >
      {loading && (
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Generating 5 unique images...</p>
          <p className="text-sm text-gray-500">This may take a moment</p>
        </div>
      )}

      {!loading && !isImagesLoaded && (
        <div className="text-center mb-8">
          <img src={assets.sample_img_1} alt="Sample" className="max-w-sm rounded mx-auto mb-4" />
        </div>
      )}

      {!loading && isImagesLoaded && (
        <div className="w-full max-w-4xl">
          {selectedImage && (
            <div className="mb-6 text-center">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-md mx-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          <p className="text-center text-gray-600 mb-4">Click any image to preview, then download</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
            {images.map((img, index) => (
              <div
                key={index}
                className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === img ? "border-blue-500 shadow-lg" : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Generated ${index + 1}`}
                  className="w-full aspect-square object-cover"
                />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
  <a
    href={img}
    download={`imagify-${index + 1}.png`}
    onClick={(e) => e.stopPropagation()}
    className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium"
  >
    Download
  </a>
</div>


                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isImagesLoaded && !loading && (
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Describe what you want to generate (5 images)"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
          />
          <button
            type="submit"
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
          >
            Generate
          </button>
        </div>
      )}

      {isImagesLoaded && !loading && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-6">
          <button
            type="button"
            onClick={handleGenerateAnother}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
          >
            Generate Another
          </button>
          {selectedImage && (
            <a
              href={selectedImage}
              download="imagify-selected.png"
              className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer hover:bg-zinc-800 transition-colors"
            >
              Download Selected
            </a>
          )}
        </div>
      )}
    </motion.form>
  );
};

export default Result;
