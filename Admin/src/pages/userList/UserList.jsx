import React from 'react'
import { Link } from 'react-router-dom';
import "./userList.css"
import { DataGrid } from '@mui/x-data-grid';
import { DeleteForever } from '@mui/icons-material';
import { userRows } from '../../DummyData';


const UserList = () => {
  const [data, setData] = React.useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'user', headerName: 'User', width: 200, renderCell: (params) => {
        return (
          <div className='userListUser'>
            <img className='userListImg' src={params.row.avatar} alt="avatar" />
            {params.row.username}
          </div>
        )
      }
    },

    { field: 'Email', headerName: 'Email', width: 180 },
    { field: 'Status', headerName: 'Status', width: 130 },
    { field: 'Transaction', headerName: 'Transaction', width: 130 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id} style={{ textDecoration: 'none' }}>
              <button className='userListEdit'>Edit</button>
            </Link>
            <DeleteForever className='userListDelete' onClick={() => handleDelete(params.row.id)} />
          </>
        )
      }
    }
  ];



  return (
    <div className='userList' style={{ height: "88vh", width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20, 30]}
        checkboxSelection
      />
    </div>
  );
}

export default UserList;
