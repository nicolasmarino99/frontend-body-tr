import React from 'react';
import ReactStopwatch from 'react-stopwatch';
 
const Stopwatch = (time) => (
  <ReactStopwatch
    seconds={0}
    minutes={0}
    hours={0}
    limit="00:00:01"
    onChange={({ hours, minutes, seconds }) => {
      // do something
    }}
    onCallback={() => <h1>You have finished</h1>}
    render={({ formatted, hours, minutes, seconds }) => {
      return (
        <div>
          <p>
            { formatted }
          </p>
        </div>
      );
    }}
   />
);

export default Stopwatch;