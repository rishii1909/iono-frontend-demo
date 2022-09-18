import React, { useEffect, useState } from "react";

import {useDispatch, useSelector} from "react-redux";

import styles from "./Home.module.css";

import Button from "../../Components/Button";
import { EXAMPLE_ACTION } from "../../Redux/ActionTypes";

const Home = () => {

  const dispatch = useDispatch(); 
  
  const example = useSelector(state => state.main_reducer.exampleState)

  // const [example, setExample] = useState(0);

  const test  = () => {
    dispatch({
      type : EXAMPLE_ACTION
    });
  }
  
  return (
    <div className={styles.container}>
      <h1>Home Component</h1>
      
      <span>Example State Value : {example}</span>
      
      <Button onClick={test} title="Sample Button" />
    </div>
  );
};

export default Home;
