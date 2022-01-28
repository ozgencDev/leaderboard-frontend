import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const client = axios.create({
  baseURL: "https://panteon-backend.herokuapp.com/api/leaderboard",
  headers: {
    "Content-Type": "application/json",
  },
});
client.interceptors.response.use(
  (resp) => {
    return resp;
  },
  (err) => {
    if (err.response.status === 400) {
      console.log("Error 400");
      alert("There is no such user");
    }
  }
);

export default function Search() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      client
        .get(
          `https://panteon-backend.herokuapp.com/api/leaderboard/${values.search}`
        )
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("users", JSON.stringify(res.data));
          sessionStorage.setItem("id", values.search);
          navigate(`/leaderboard`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <div id="cover">
      <form onSubmit={formik.handleSubmit}>
        <div className="tb">
          <div className="td">
            {" "}
            <input
              placeholder="Username"
              name="search"
              type="search"
              onChange={formik.handleChange}
              value={formik.values.search}
            />
          </div>
          <div className="td" id="s-cover">
            <button className="searchButton" type="button">
              <div id="s-circle"></div>
              <span></span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
