// // NewMovie.jsx (updated)
// import './newMovie.css';
// import { useContext, useState } from "react";
// import axios from "axios";
// import { createMovie } from "../../context/movieContext/apiCalls";
// import { MovieContext } from "../../context/movieContext/MovieContext";

// const NewMovie = () => {
//   const [movie, setMovie] = useState({});
//   const [img, setImg] = useState(null);
//   const [imgSm, setImgSm] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [uploaded, setUploaded] = useState(0);
//   const { dispatch } = useContext(MovieContext);

//   const handleChange = (e) => setMovie({ ...movie, [e.target.name]: e.target.value });

//   const uploadToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     const res = await axios.post("http://localhost:3000/api/upload", formData);
//     return res.data.url;
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     try {
//       const imgUrl = await uploadToCloudinary(img);
//       const imgSmUrl = await uploadToCloudinary(imgSm);
//       const videoUrl = video ? await uploadToCloudinary(video) : "";
//       setMovie(prev => ({ ...prev, img: imgUrl, imgSm: imgSmUrl, video: videoUrl }));
//       setUploaded(3);
//       alert("Files uploaded successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createMovie(movie, dispatch);
//     alert("Movie created successfully!");
//     setMovie({}); setImg(null); setImgSm(null); setVideo(null); setUploaded(0);
//   };

//   return (
//     <div className="newProduct">
//       <h1 className="addProductTitle">New Movie</h1>
//       <form className="addProductForm">
//         <div className="addProductItem">
//           <label>Poster Image</label>
//           <input type="file" onChange={(e) => setImg(e.target.files[0])} />
//         </div>
//         <div className="addProductItem">
//           <label>Thumbnail Image</label>
//           <input type="file" onChange={(e) => setImgSm(e.target.files[0])} />
//         </div>
//         <div className="addProductItem">
//           <label>Trailer / Video</label>
//           <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
//         </div>
//         <div className="addProductItem">
//           <label>Title</label>
//           <input type="text" name="title" onChange={handleChange} />
//         </div>
//         <div className="addProductItem">
//           <label>Description</label>
//           <input type="text" name="desc" onChange={handleChange} />
//         </div>
//         <div className="addProductItem">
//           <label>Genre</label>
//           <input type="text" name="genre" onChange={handleChange} />
//         </div>
//         <div className="addProductItem">
//           <label>Year</label>
//           <input type="text" name="year" onChange={handleChange} />
//         </div>
//         <div className="addProductItem">
//           <label>Limit</label>
//           <input type="text" name="limit" onChange={handleChange} />
//         </div>
//         <div className="addProductItem">
//           <label>Is Series?</label>
//           <select name="isSeries" onChange={handleChange}>
//             <option value="false">No</option>
//             <option value="true">Yes</option>
//           </select>
//         </div>
//         {uploaded === 3
//           ? <button className="addProductButton" onClick={handleSubmit}>Create Movie</button>
//           : <button className="addProductButton" onClick={handleUpload}>Upload Files</button>
//         }
//       </form>
//     </div>
//   );
// };

// export default NewMovie;



// import "./newMovie.css";
// import { useContext, useState } from "react";
// import axios from "axios";
// import { createMovie } from "../../context/movieContext/apiCalls";
// import { MovieContext } from "../../context/movieContext/MovieContext";

// const NewMovie = () => {
//   const [movie, setMovie] = useState({});
//   const [img, setImg] = useState(null);
//   const [imgSm, setImgSm] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [uploaded, setUploaded] = useState(0);
//   const [progress, setProgress] = useState({
//     img: 0,
//     imgSm: 0,
//     video: 0,
//   });

//   const { dispatch } = useContext(MovieContext);

//   const handleChange = (e) =>
//     setMovie({ ...movie, [e.target.name]: e.target.value });

//   // Upload with progress tracking
//   const uploadToCloudinary = async (file, keyName) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await axios.post("http://localhost:3000/api/upload", formData, {
//       onUploadProgress: (event) => {
//         const percent = Math.round((event.loaded * 100) / event.total);
//         setProgress((prev) => ({ ...prev, [keyName]: percent }));
//       },
//     });

//     return res.data.url;
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     try {
//       let imgUrl = "";
//       let imgSmUrl = "";
//       let videoUrl = "";

//       if (img) imgUrl = await uploadToCloudinary(img, "img");
//       if (imgSm) imgSmUrl = await uploadToCloudinary(imgSm, "imgSm");
//       if (video) videoUrl = await uploadToCloudinary(video, "video");

//       setMovie((prev) => ({
//         ...prev,
//         img: imgUrl,
//         imgSm: imgSmUrl,
//         video: videoUrl,
//       }));

//       setUploaded(3);
//       alert("✅ Files uploaded successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Upload failed");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createMovie(movie, dispatch);
//     alert("🎬 Movie created successfully!");
//     setMovie({});
//     setImg(null);
//     setImgSm(null);
//     setVideo(null);
//     setUploaded(0);
//     setProgress({ img: 0, imgSm: 0, video: 0 });
//   };

//   return (
//     <div className="newProduct">
//       <h1 className="addProductTitle">New Movie</h1>
//       <form className="addProductForm">
//         <div className="addProductItem">
//           <label>Poster Image</label>
//           <input type="file" onChange={(e) => setImg(e.target.files[0])} />
//           {progress.img > 0 && (
//             <div className="progress-container">
//               <div
//                 className="progress-bar"
//                 style={{ width: `${progress.img}%` }}
//               ></div>
//               <span>{progress.img}%</span>
//             </div>
//           )}
//         </div>

//         <div className="addProductItem">
//           <label>Thumbnail Image</label>
//           <input type="file" onChange={(e) => setImgSm(e.target.files[0])} />
//           {progress.imgSm > 0 && (
//             <div className="progress-container">
//               <div
//                 className="progress-bar"
//                 style={{ width: `${progress.imgSm}%` }}
//               ></div>
//               <span>{progress.imgSm}%</span>
//             </div>
//           )}
//         </div>

//         <div className="addProductItem">
//           <label>Trailer / Video</label>
//           <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
//           {progress.video > 0 && (
//             <div className="progress-container">
//               <div
//                 className="progress-bar"
//                 style={{ width: `${progress.video}%` }}
//               ></div>
//               <span>{progress.video}%</span>
//             </div>
//           )}
//         </div>

//         <div className="addProductItem">
//           <label>Title</label>
//           <input type="text" name="title" onChange={handleChange} />
//         </div>

//         <div className="addProductItem">
//           <label>Description</label>
//           <input type="text" name="desc" onChange={handleChange} />
//         </div>

//         <div className="addProductItem">
//           <label>Genre</label>
//           <input type="text" name="genre" onChange={handleChange} />
//         </div>

//         <div className="addProductItem">
//           <label>Year</label>
//           <input type="text" name="year" onChange={handleChange} />
//         </div>

//         <div className="addProductItem">
//           <label>Limit</label>
//           <input type="text" name="limit" onChange={handleChange} />
//         </div>

//         <div className="addProductItem">
//           <label>Is Series?</label>
//           <select name="isSeries" onChange={handleChange}>
//             <option value="false">No</option>
//             <option value="true">Yes</option>
//           </select>
//         </div>

//         {uploaded === 3 ? (
//           <button className="addProductButton" onClick={handleSubmit}>
//             Create Movie
//           </button>
//         ) : (
//           <button className="addProductButton" onClick={handleUpload}>
//             Upload Files
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default NewMovie;



// import "./newMovie.css";
// import { useContext, useRef, useState } from "react";
// import axios from "axios";
// import { createMovie } from "../../context/movieContext/apiCalls";
// import { MovieContext } from "../../context/movieContext/MovieContext";

// const NewMovie = () => {
//   const [movie, setMovie] = useState({});
//   const [img, setImg] = useState(null);
//   const [imgSm, setImgSm] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [uploaded, setUploaded] = useState(0);
//   const [progress, setProgress] = useState({ img: 0, imgSm: 0, video: 0 });
//   const [message, setMessage] = useState(null); // ✅ success/error message

//   const formRef = useRef(null);
//   const { dispatch } = useContext(MovieContext);

//   const handleChange = (e) =>
//     setMovie({ ...movie, [e.target.name]: e.target.value });

//   const uploadToCloudinary = async (file, keyName) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await axios.post("http://localhost:3000/api/upload", formData, {
//       onUploadProgress: (event) => {
//         const percent = Math.round((event.loaded * 100) / event.total);
//         setProgress((prev) => ({ ...prev, [keyName]: percent }));
//       },
//     });

//     return res.data.url;
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     try {
//       let imgUrl = "";
//       let imgSmUrl = "";
//       let videoUrl = "";

//       if (img) imgUrl = await uploadToCloudinary(img, "img");
//       if (imgSm) imgSmUrl = await uploadToCloudinary(imgSm, "imgSm");
//       if (video) videoUrl = await uploadToCloudinary(video, "video");

//       setMovie((prev) => ({
//         ...prev,
//         img: imgUrl,
//         imgSm: imgSmUrl,
//         video: videoUrl,
//       }));

//       setUploaded(3);
//       setMessage({ type: "success", text: "✅ Files uploaded successfully!" });
//       setTimeout(() => setMessage(null), 3000);
//     } catch (err) {
//       console.error(err);
//       setMessage({ type: "error", text: "❌ Upload failed" });
//       setTimeout(() => setMessage(null), 3000);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createMovie(movie, dispatch);

//     // ✅ Show success message on screen
//     setMessage({ type: "success", text: "🎬 Movie created successfully!" });
//     setTimeout(() => setMessage(null), 3000);

//     // ✅ Reset fields
//     setMovie({});
//     setImg(null);
//     setImgSm(null);
//     setVideo(null);
//     setUploaded(0);
//     setProgress({ img: 0, imgSm: 0, video: 0 });
//     if (formRef.current) formRef.current.reset();
//   };

//   return (
//     <div className="newProduct">
//       <h1 className="addProductTitle">New Movie</h1>
//       <form className="addProductForm" ref={formRef}>
//         <div className="addProductItem">
//           <label>Poster Image</label>
//           <input type="file" onChange={(e) => setImg(e.target.files[0])} />
//           {progress.img > 0 && (
//             <div className="progress-container">
//               <div className="progress-bar" style={{ width: `${progress.img}%` }}></div>
//               <span>{progress.img}%</span>
//             </div>
//           )}
//         </div>

//         <div className="addProductItem">
//           <label>Thumbnail Image</label>
//           <input type="file" onChange={(e) => setImgSm(e.target.files[0])} />
//           {progress.imgSm > 0 && (
//             <div className="progress-container">
//               <div className="progress-bar" style={{ width: `${progress.imgSm}%` }}></div>
//               <span>{progress.imgSm}%</span>
//             </div>
//           )}
//         </div>

//         <div className="addProductItem">
//           <label>Trailer / Video</label>
//           <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
//           {progress.video > 0 && (
//             <div className="progress-container">
//               <div className="progress-bar" style={{ width: `${progress.video}%` }}></div>
//               <span>{progress.video}%</span>
//             </div>
//           )}
//         </div>

//         <div className="addProductItem">
//           <label>Title</label>
//           <input type="text" name="title" onChange={handleChange} />
//         </div>

//         <div className="addProductItem">
//           <label>Description</label>
//           <input type="text" name="desc" onChange={handleChange} />
//         </div>

//         <div className="addProductItem">
//           <label>Genre</label>
//           <input type="text" name="genre" onChange={handleChange} />
//         </div>

//         <div className="addProductItem">
//           <label>Year</label>
//           <input type="text" name="year" onChange={handleChange} />
//         </div>

//         <div className="addProductItem">
//           <label>Limit</label>
//           <input type="text" name="limit" onChange={handleChange} />
//         </div>

//         <div className="addProductItem">
//           <label>Is Series?</label>
//           <select name="isSeries" onChange={handleChange}>
//             <option value="false">No</option>
//             <option value="true">Yes</option>
//           </select>
//         </div>

//         {uploaded === 3 ? (
//           <button className="addProductButton" onClick={handleSubmit}>
//             Create Movie
//           </button>
//         ) : (
//           <button className="addProductButton" onClick={handleUpload}>
//             Upload Files
//           </button>
//         )}
//       </form>

//       {/* ✅ Success/Error Message */}
//       {message && (
//         <div
//           className={`message-box ${
//             message.type === "success" ? "success" : "error"
//           }`}
//         >
//           {message.text}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewMovie;



import "./newMovie.css";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

const NewMovie = () => {
  const [movie, setMovie] = useState({});
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [progress, setProgress] = useState({ img: 0, video: 0 });
  const [message, setMessage] = useState(null);

  const formRef = useRef(null);
  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const uploadToCloudinary = async (file, keyName) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://localhost:3000/api/upload", formData, {
      onUploadProgress: (event) => {
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgress((prev) => ({ ...prev, [keyName]: percent }));
      },
    });

    return res.data.url;
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      let imgUrl = "";
      let videoUrl = "";

      if (img) imgUrl = await uploadToCloudinary(img, "img");
      if (video) videoUrl = await uploadToCloudinary(video, "video");

      setMovie((prev) => ({
        ...prev,
        img: imgUrl,
        video: videoUrl,
      }));

      setUploaded(2);
      setMessage({ type: "success", text: "✅ Files uploaded successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "❌ Upload failed" });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);

    setMessage({ type: "success", text: "🎬 Movie created successfully!" });
    setTimeout(() => setMessage(null), 3000);

    setMovie({});
    setImg(null);
    setVideo(null);
    setUploaded(0);
    setProgress({ img: 0, video: 0 });
    if (formRef.current) formRef.current.reset();
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm" ref={formRef}>
        {/* Poster Upload */}
        <div className="addProductItem">
          <label>Poster Image</label>
          <input type="file" onChange={(e) => setImg(e.target.files[0])} />
          {progress.img > 0 && (
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progress.img}%` }}></div>
              <span>{progress.img}%</span>
            </div>
          )}
        </div>

        {/* Video Upload */}
        <div className="addProductItem">
          <label>Trailer / Video</label>
          <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
          {progress.video > 0 && (
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progress.video}%` }}></div>
              <span>{progress.video}%</span>
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" name="title" onChange={handleChange} placeholder="Movie title..." />
        </div>

        <div className="addProductItem">
          <label>Short Description</label>
          <input
            type="text"
            name="desc"
            onChange={handleChange}
            placeholder="Brief summary or tagline..."
          />
        </div>

        <div className="addProductItem">
          <label>Long Description</label>
          <textarea
            name="ldesc"
            rows="6"
            placeholder="Enter detailed movie description..."
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" name="genre" onChange={handleChange} placeholder="e.g. Action" />
        </div>

        <div className="addProductItem">
          <label>Year</label>
          <input type="text" name="year" onChange={handleChange} placeholder="e.g. 2025" />
        </div>

        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            name="duration"
            onChange={handleChange}
            placeholder="e.g. 2h 15m or 145 min"
          />
        </div>

        <div className="addProductItem">
          <label>Age Limit</label>
          <input type="text" name="limit" onChange={handleChange} placeholder="e.g. 16" />
        </div>

        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        {/* Buttons */}
        {uploaded === 2 ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Create Movie
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload Files
          </button>
        )}
      </form>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`message-box ${
            message.type === "success" ? "success" : "error"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default NewMovie;
