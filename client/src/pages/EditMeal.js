import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

const EditPage = (props) => {
  const history = useHistory();
  const [meal, setMeal] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //   Input feilds
  const nameRef = useRef(null);
  const typeRef = useRef(null);
  const descriptionRef = useRef(null);
  const caloriesRef = useRef(null);

  const GetMealById = async (id) => {
    const response = await axios.get(`/user/meal/${id}`);
    if (response.data.success) {
      const { calories, name, type, description, _id } = response.data.meal;
      setMeal({ calories, name, description, type, id: _id });
      nameRef.current.value = name;
      typeRef.current.value = type;
      descriptionRef.current.value = description;
      caloriesRef.current.value = calories;
    } else {
      setError("No Meal Selected For Edit!");
    }
  };

  const editMeal = async (id) => {
    const body = {
      name: nameRef.current.value,
      type: typeRef.current.value,
      description: descriptionRef.current.value,
      calories: caloriesRef.current.value,
    };
    
    // console.log(body);
    const response = await axios.put(`/user/meal/${id}`, body);
    if (response.data.success) {
        history.push("/dashboard")
    } else {
        setError("Error Occurre while Updating")
    }
  };

  useEffect(() => {
    let mealId;
    setIsLoading(true);
    setError("");
    console.log(props)
    if (props.location.state !== undefined) {
      mealId = props.location.state.id;
      console.log(mealId);
      GetMealById(mealId);
      setIsLoading(false);
    } else {
      setError("Please Sign-In Again");
      setIsLoading(false);
    }
  }, [props.location.state]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error !== "") {
    return <h3>{error}</h3>;
  }

  return (
    <>
    <UserNavbar />
    <div className="app-container">
      <form
        className="form-feild"
        onSubmit={(e) => {
          e.preventDefault();
          editMeal(meal.id);
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          required
          ref={nameRef}
          type="text"
          name="name"
          id="name"
          onChange={(e) => {
            nameRef.current.value = e.target.value;
          }}
        />
        <br />
        <label htmlFor="type">Type</label>
        <input
          required
          ref={typeRef}
          type="text"
          name="type"
          id="type"
          onChange={(e) => {
            typeRef.current.value = e.target.value;
          }}
        />
        <br />
        <label htmlFor="description">Description</label>
        <input
          required
          ref={descriptionRef}
          type="text"
          name="description"
          id="description"
          onChange={(e) => {
            descriptionRef.current.value = e.target.value;
          }}
        />
        <br />
        <label htmlFor="calories">Calories</label>
        <input
          required
          ref={caloriesRef}
          type="number"
          name="calories"
          step="any"
          id="calories"
          onChange={(e) => {
            caloriesRef.current.value = e.target.value;
          }}
        />
        <br />
        <button>Edit Meal</button>
        <Link to="/dashboard">Cancel</Link>
      </form>
    </div>
    </>
  );
};

export default EditPage;
