import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000/api/leaderboard",
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
        .get(`http://localhost:3000/api/leaderboard/${values.search}`)
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
        <div class="tb">
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
          <div class="td" id="s-cover">
            <button className="searchButton">
              <div id="s-circle"></div>
              <span></span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
