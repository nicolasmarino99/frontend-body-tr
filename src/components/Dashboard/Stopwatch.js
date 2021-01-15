/* eslint-disable react/prop-types */
import React from 'react';
import ReactStopwatch from 'react-stopwatch';

const Stopwatch = ({ time }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <ReactStopwatch
    seconds={0}
    minutes={0}
    hours={0}
    limit={time}
    render={({
      formatted,
    }) => (
      <div>
        <p>
          { formatted }
        </p>
      </div>
    )}
  />
);

export default Stopwatch;
