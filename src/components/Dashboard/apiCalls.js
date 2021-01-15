/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';

const postElement = async (element, type, url, dispatch) => {
  try {
    const response = await axios.post(
      url,
      element,
      { withCredentials: true },
    );
    dispatch({
      type,
      payload: [response.data],
    });
  } catch (err) {
    console.error(err);
  }
};

const getElements = async (type, url, dispatch) => {
  try {
    const response = await axios.get(
      url,
      { withCredentials: true },
    );
    dispatch({
      type,
      payload: response.data,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

const deleteElement = async (type, url, dispatch, id) => {
  try {
    const response = await axios.delete(
      url,
      { withCredentials: true },
    );
    dispatch({
      type,
      payload: id,
    });
  } catch (err) {
    console.error(err);
  }
};

const updateElement = async (element, type, url, dispatch, id) => {
  try {
    const response = await axios.put(
      url,
      element,
      { withCredentials: true },
    );
    dispatch({
      type,
      payload: { data: [response.data], id },
    });
  } catch (err) {
    console.error(err);
  }
};

const getImage = async (name) => {
  const clientIDKey = '5phIk2Z31V96pArCaFDbgnDH0rG6gJZ7NMaCr4R3CEg';
  const ulr2 = `https://api.unsplash.com/search/photos/?client_id=${clientIDKey}&query=${name}`;
  const img = (await axios.get(ulr2)).data.results[0].urls.thumb;
  return img;
};
export {
  postElement, getElements, deleteElement, getImage, updateElement,
};
