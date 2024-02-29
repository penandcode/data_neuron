import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backend } from "../App";

const Task = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [table, setTable] = useState([]);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [add, setAdd] = useState(0)
  const [edit, setEdit] = useState(0)

  const getData = async () => {
    try {
      const res = await axios.get(backend.endpoint);
      setTable(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAdd = async () => {
    try {
      const res = await axios.get(backend.endpoint+'/add/count');
      setAdd(res.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const getEdit = async () => {
    try {
      const res = await axios.get(backend.endpoint+'/update/count');
      setEdit(res.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getAdd();
    getEdit();

  }, []);

  const handleClickAdd = async () => {
    try {
      if (selectedId) {
        await axios.put(`${backend.endpoint}/edit/${selectedId}`, data);
      } else {
        console.log(validate(data));
        if (validate(data)) {
          await axios.post(`${backend.endpoint}/add`, data);
        }
      }

      getData();
      setOpen(false);
      setSelectedId(null);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    const selectedItem = table.find((item) => item._id === id);
    setData({ ...selectedItem });
    setSelectedId(id);
    setOpen(true);
  };

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (data) => {
    if (!data.name || !data.email || !data.phone) {
      setError("Please fill all the details.");
      return false;
    }
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(data.email)) {
      setError("Please enter the correct email.");
      return false;
    }
    if (!data.phone.length == 10) {
      setError("Phone number should be atleast 10 characters.");
      return false;
    }
    return true;
  };

  return (
    <div className="container">
      <div className="button-container">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Go back
        </button>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      <div style={{display:"flex", width:"80vw", color:"white", justifyContent:"space-between", marginInline:"auto", marginBlock:"2rem"}}>
        <div>Add Api: {add}</div>
        <div>Edit Api: {edit}</div>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
          {table?.length > 0 ? (
            table?.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td align="center">
                  <button onClick={() => handleEdit(item._id)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={`modal ${open ? "open" : ""}`}>
        <div className="modal-content">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={data.phone}
            onChange={handleChange}
          />
          {error && (
            <div style={{ color: "lightred", textAlign: "center" }}>
              {error}
            </div>
          )}
          <div className="button-container">
            <button
              onClick={() => {
                setOpen(false);
                setData({
                  name: "",
                  email: "",
                  phone: "",
                });
              }}
            >
              Cancel
            </button>
            <button onClick={handleClickAdd}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
