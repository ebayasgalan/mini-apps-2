import React from 'react';

const Events = (props) => {
  return (
    <div>{props.events.map((event, i) => {
      return <div key={i}>● {event.description}</div>;
    })}</div>
  )
}

export default Events;