import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import EditUser from "./EditUser";
import Modal from "@mui/material/Modal";
import CreateUser from "./CreateUser";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function UserList() {
  const [users, setUsers] = useState([]);
  const [edituser, setEdituser] = useState({});
  const [editopen, setEditOpen] = useState(false);
  const [snackeditOpen,setSnackEditOpen]=useState(false);
  const [snackcreateOpen,setSnackCreateOpen]=useState(false);
  const [snackdeleteOpen,setSnackDeleteOpen]=useState(false);
  const [createopen, setCreateOpen] = useState(false);
  const edithandleClose = () => {
    setEditOpen(false);
  };
  const handleDelete = (e,id) => {
    e.stopPropagation();
    axios
      .delete(`${REACT_APP_STRIPE_PROD_APP_KEY}/api/users/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    // Make a request for a user with a given ID
    fetchData();
  }, []);

  return (
    <div>
    <Snackbar open={snackcreateOpen} autoHideDuration={6000} onClose={()=>setSnackCreateOpen(false)}>
    <Alert onClose={()=>setSnackCreateOpen(false)} severity="success" sx={{ width: '100%' }}>
    Added a new user to list
   </Alert>
    </Snackbar>
    <Snackbar open={snackdeleteOpen} autoHideDuration={6000} onClose={()=>setSnackDeleteOpen(false)}>
    <Alert onClose={()=>setSnackDeleteOpen(false)} severity="error" sx={{ width: '100%' }}>
    Deleted a user
   </Alert>
    </Snackbar>
    <Snackbar open={snackeditOpen} autoHideDuration={6000} onClose={()=>setSnackEditOpen(false)}>
    <Alert onClose={()=>setSnackEditOpen(false)} severity="success" sx={{ width: '100%' }}>
    Edited a user
   </Alert>
    </Snackbar>
      <h2>User List</h2>
      <Button
        onClick={() => {
          setCreateOpen(true);
        }}
      >
        Create User
      </Button>
      <ul>
        {users?.map((user) => (
          <li
            key={user._id}
            onClick={(e) => {
              setEditOpen(true);
              setEdituser(user);
            }}
            style={{
              width: "100%",
              cursor: "pointer",
              paddingInline: "1rem",
              paddingBlock: "5px",
              borderRadius: "8px",
            }}
          >
            {user.firstName} {user.lastName}
            <Button
              style={{ marginLeft: "2rem" }}
              onClick={() => handleDelete(user._id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <Modal
        open={editopen}
        onClose={edithandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditUser
          edituser={edituser}
          setEditOpen={setEditOpen}
          fetchData={fetchData}
          snackeditOpen={snackeditOpen}
          setSnackEditOpen={setSnackEditOpen}
        />
      </Modal>
      <Modal
        open={createopen}
        onClose={() => {
          setCreateOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateUser
          setCreateOpen={setCreateOpen}
          users={users}
          setUsers={setUsers}
          setSnackCreateOpen={setSnackCreateOpen}
          snackcreateOpen={snackcreateOpen}
        />
      </Modal>
    </div>
  );
}

export default UserList;
