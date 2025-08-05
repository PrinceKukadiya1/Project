import './movie.css';
import { Publish } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import { MovieContext } from '../../context/movieContext/MovieContext';
import { updateMovie } from '../../context/movieContext/apiCalls';

const Movie = () => {
  const location = useLocation();
  const { dispatch } = useContext(MovieContext);
  const movie = location.state?.movie;

  const [formData, setFormData] = useState({
    title: movie.title || "",
    year: movie.year || "",
    genre: movie.genre || "",
    limit: movie.limit || "",
    desc: movie.desc || "",
    img: movie.img || "",
  });

  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
    if (file) {
      setFormData((prev) => ({
        ...prev,
        img: URL.createObjectURL(file),
      }));
    }
  };

  const uploadImageAndUpdate = async () => {
    return new Promise((resolve, reject) => {
      const fileName = new Date().getTime() + imgFile.name;
      const storageRef = ref(storage, `/movies/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, imgFile);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error("Upload error:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve(url);
          });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedMovie = { ...movie, ...formData };

      if (imgFile) {
        const uploadedUrl = await uploadImageAndUpdate();
        updatedMovie.img = uploadedUrl;
      }

      updateMovie(movie._id, updatedMovie, dispatch);
      alert("Movie updated successfully!");
    } catch (err) {
      alert("Update failed. See console.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='product'>
      <div className="productContainer">
        <h1 className="productTitle">Edit Movie</h1>
      </div>

      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={formData.img} alt="preview" className="productImg" />
            <span className="productName">{formData.title}</span>
          </div>

          <table className="movieInfoTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Genre</th>
                <th>Year</th>
                <th>Limit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{movie._id}</td>
                <td>{formData.genre}</td>
                <td>{formData.year}</td>
                <td>{formData.limit}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="productFormLeft">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
            <label>Year</label>
            <input type="text" name="year" value={formData.year} onChange={handleChange} />
            <label>Genre</label>
            <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
            <label>Limit</label>
            <input type="text" name="limit" value={formData.limit} onChange={handleChange} />
            <label>Description</label>
            <input type="text" name="desc" value={formData.desc} onChange={handleChange} />
          </div>

          <div className="productFormRight">
            <div className="productUpload">
              <img src={formData.img} alt="preview" className="productUploadImg" />
              <label htmlFor="file"><Publish /></label>
              <input type="file" id="file" style={{ display: "none" }} onChange={handleImageChange} />
            </div>
            <button className="productButton" type="submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Movie;
