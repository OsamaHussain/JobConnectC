import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import "./Home.css";
import * as Icon from "react-feather";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup");
    } else {
      setHidden(false);
    }

    (async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/post/GetPosts");
        setData(res.data);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, [loggedIn]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/post/DeletePost",
        {
          id,
        }
      );
      setData(data.filter((data) => data._id !== id));
      alert("Post Deleted Successfully");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleEdit = async (item) => {
    try {
      const updatedJobTitle = document.querySelector(
        `li[data-id="${item._id}-jobTitle"]`
      ).textContent;
      const updatedSalary = document.querySelector(
        `li[data-id="${item._id}-salary"]`
      ).textContent;
      const updatedLocation = document.querySelector(
        `li[data-id="${item._id}-location"]`
      ).textContent;
      const updatedJobType = document.querySelector(
        `li[data-id="${item._id}-jobtype"]`
      ).textContent;
      const updatedExperience = document.querySelector(
        `li[data-id="${item._id}-experience"]`
      ).textContent;

      const res = await axios.post("http://localhost:5000/api/post/EditPost", {
        id: item._id,
        jobTitle: updatedJobTitle,
        salary: updatedSalary,
        location: updatedLocation,
        jobtype: updatedJobType,
        experience: updatedExperience,
      });
      alert("Post Edited Successfully");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={hidden ? "hidden" : "visible"}>
      <NavigationBar />
      <div className="home--container">
        {data.map((item, index) => (
          <div className="border home--inner--container" key={index}>
            <li
              className="editable jobTitle"
              contenteditable="true"
              data-id={`${item._id}-jobTitle`}
              onInput={(e) => {
                if (e.target.textContent.length > 20) {
                  e.target.textContent = e.target.textContent.slice(0, 20);
                  const range = document.createRange();
                  const sel = window.getSelection();
                  range.selectNodeContents(e.target);
                  range.collapse(false);
                  sel.removeAllRanges();
                  sel.addRange(range);
                }
              }}
            >
              {item.jobTitle.slice(0, 20)}
            </li>
            <div className="card--outer--container">
              <div className="card--inner--container">
                <Icon.TrendingUp />
                <li
                  className="editable"
                  contenteditable="true"
                  data-id={`${item._id}-salary`}
                >
                  {item.salary}
                </li>
              </div>
              <div className="card--inner--container">
                <Icon.Globe />
                <li
                  className="editable"
                  contenteditable="true"
                  data-id={`${item._id}-location`}
                >
                  {item.location}
                </li>
              </div>
              <div className="card--inner--container">
                <Icon.Server />
                <li
                  className="editable"
                  contenteditable="true"
                  data-id={`${item._id}-jobtype`}
                >
                  {item.jobtype}
                </li>
              </div>
              <div className="card--inner--container">
                <Icon.Award />
                <li
                  className="editable"
                  contenteditable="true"
                  data-id={`${item._id}-experience`}
                >
                  {item.experience}
                </li>
              </div>
            </div>
            <div className="d-flex">
              <button
                className="blue"
                onClick={() => {
                  handleEdit(item);
                }}
              >
                Edit
              </button>
              <button
                className="red"
                onClick={() => {
                  handleDelete(item._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
