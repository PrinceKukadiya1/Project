// import './newMovie.css'
// import { useContext, useState } from "react";
// import storage from "../../firebase";
// import { createMovie } from "../../context/movieContext/apiCalls";
// import { MovieContext } from "../../context/movieContext/MovieContext";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


// const NewMovie = () => {

//   const [movie, setMovie] = useState({});
//   const [img, setImg] = useState(null);
//   const [imgSm, setImgSm] = useState(null);
//   // const [trailer, setTrailer] = useState(null);
//   // const [video, setVideo] = useState(null); // commented out video state
//   const [uploaded, setUploaded] = useState(0);

//   const { dispatch } = useContext(MovieContext);

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setMovie({ ...movie, [e.target.name]: value });
//   };

//   const upload = (items) => {
//     items.forEach((item) => {
//       const fileName = new Date().getTime() + item.label + item.file.name;

//       const storageRef = ref(storage, `items/${fileName}`);
//       const uploadTask = uploadBytesResumable(storageRef, item.file);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log("Upload is " + progress + "% done");
//         },
//         (error) => {
//           console.log(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//             setMovie((prev) => {
//               return { ...prev, [item.label]: url };
//             });
//             setUploaded((prev) => prev + 1);
//           });

//         }
//       );
//     });
//   };

//   const handleUpload = (e) => {
//     e.preventDefault();
//     upload([
//       { file: img, label: "img" },
//       { file: imgSm, label: "imgSm" },
//       // { file: trailer, label: "trailer" },
//       // { file: video, label: "video" }, // commented out video upload
//     ]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createMovie(movie, dispatch);
//   };


//   return (
//     <div className="newProduct">
//       <h1 className="addProductTitle">New Movie</h1>
//       <form className="addProductForm">
//         <div className="addProductItem">
//           <label>Image</label>
//           <input
//             type="file"
//             id="img"
//             name="img"
//             onChange={(e) => setImg(e.target.files[0])}
//           />
//         </div>

//         <div className="addProductItem">
//           <label>Thumbnail image</label>
//           <input
//             type="file"
//             id="imgSm"
//             name="imgSm"
//             onChange={(e) => setImgSm(e.target.files[0])}
//           />
//         </div>

//         <div className="addProductItem">
//           <label>Title</label>
//           <input
//             type="text"
//             placeholder="John Wick"
//             name="title"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="addProductItem">
//           <label>Description</label>
//           <input
//             type="text"
//             placeholder="description"
//             name="desc"
//             onChange={handleChange}
//           />
//         </div>
        
//         <div className="addProductItem">
//           <label>Large Description</label>
//           <input
//             type="text"
//             placeholder="description"
//             name="ldesc"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="addProductItem">
//           <label>Year</label>
//           <input
//             type="text"
//             placeholder="Year"
//             name="year"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="addProductItem">
//           <label>Genre</label>
//           <input
//             type="text"
//             placeholder="Genre"
//             name="genre"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="addProductItem">
//           <label>Duration</label>
//           <input
//             type="text"
//             placeholder="Duration"
//             name="duration"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="addProductItem">
//           <label>Limit</label>
//           <input
//             type="text"
//             placeholder="limit"
//             name="limit"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="addProductItem">
//           <label>Is Series?</label>
//           <select name="isSeries" id="isSeries" onChange={handleChange}>
//             <option value="false">No</option>
//             <option value="true">Yes</option>
//           </select>
//         </div>

//         {/* <div className="addProductItem">
//           <label>Trailer</label>
//           <input
//             type="file"
//             name="trailer"
//             onChange={(e) => setTrailer(e.target.files[0])}
//           />
//         </div> */}

//         {/* 
//         <div className="addProductItem">
//           <label>Video</label>
//           <input
//             type="file"
//             name="video"
//             onChange={(e) => setVideo(e.target.files[0])}
//           />
//         </div> 
//         */}

//         {uploaded === 2 ? (
//           <button className="addProductButton" onClick={handleSubmit}>
//             Create
//           </button>
//         ) : (
//           <button className="addProductButton" onClick={handleUpload}>
//             Upload
//           </button>
//         )}
//       </form>
//     </div>
//   )
// }

// export default NewMovie



import './newMovie.css';
import { useContext, useState } from "react";
import storage from "../../firebase";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const NewMovie = () => {
  const [movie, setMovie] = useState({});
  const [img, setImg] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `items/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setMovie((prev) => ({ ...prev, [item.label]: url }));
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!img || !imgSm) {
      alert("Please upload all required files.");
      return;
    }
    upload([
      { file: img, label: "img" },
      { file: imgSm, label: "imgSm" },
    ]);
  };

  const resetForm = () => {
    setMovie({});
    setImg(null);
    setImgSm(null);
    setUploaded(0);
    document.getElementById("new-movie-form").reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
    alert("Movie created!");
    resetForm();
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm" id="new-movie-form">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" onChange={(e) => setImg(e.target.files[0])} />
        </div>

        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input type="file" onChange={(e) => setImgSm(e.target.files[0])} />
        </div>

        <div className="addProductItem">
          <label>Title</label>
          <input type="text" name="title" placeholder="John Wick" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Description</label>
          <input type="text" name="desc" placeholder="Short description" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Large Description</label>
          <input type="text" name="ldesc" placeholder="Long description" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Year</label>
          <input type="text" name="year" placeholder="2024" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" name="genre" placeholder="Action" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" name="duration" placeholder="2h 10min" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" name="limit" placeholder="18+" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        {uploaded === 2 ? (
          <button className="addProductButton" onClick={handleSubmit}>Create</button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>Upload</button>
        )}
      </form>
    </div>
  );
};

export default NewMovie;

