import './movieList.css'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteForever } from '@mui/icons-material';
import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";


const MovieList = ({ data }) => {

  const { movies, dispatch } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };



  const columns = [
    { field: '_id', headerName: 'ID', width: 80 },
    {
      field: 'movie', headerName: 'Movie', width: 200, renderCell: (params) => {
        return (
          <div className='productListItem'>
            <img className='productListImg' src={params.row.img} alt="image" />
            {params.row.title}
          </div>
        )
      }
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "year", width: 120 },
    { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/movie/${params.row._id}`}
              state={{ movie: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteForever
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];


  return (
    <div className='productList'>
      <DataGrid
        rows={movies}
        columns={columns}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20, 30]}
        checkboxSelection
        getRowId={(r) => r._id}
      />

    </div>
  )
}

export default MovieList
