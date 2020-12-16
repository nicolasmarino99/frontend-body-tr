import React from 'react';
import axios from 'axios';

const postCategory = async (category, type, url, dispatch) => {
    try {
        const response = await axios.post(
            url,
            category,
            {withCredentials: true}
        );
        dispatch({
          type,
          payload: [response.data]
        });
    } catch (err) {
        console.error(err);
    }
}

const getCategories = async (type, url, dispatch) => {
    try {
      const response = await axios.get(
        url,
        {withCredentials: true}
      );
      dispatch({
        type,
        payload: response.data
      });

    } catch (err) {
        console.error(err);
    }
  };

export {postCategory, getCategories};