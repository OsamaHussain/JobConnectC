import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Post.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

function Post() {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [experience, setExperience] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup");
    } else {
      setHidden(false);
    }
  }, [loggedIn]);

  const handlePost = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/post/CreatePost",
        {
          jobTitle,
          salary,
          location,
          jobtype,
          experience,
        }
      );
      alert("Job Successfully Posted");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={hidden ? "hidden" : "visible"}>
      <NavigationBar />
      <div className="login-container">
        <h2>Create Post</h2>
        <div className="login-form">
          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Job Type"
            value={jobtype}
            onChange={(e) => setJobtype(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
          <br />
          <button onClick={handlePost}>Post</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
