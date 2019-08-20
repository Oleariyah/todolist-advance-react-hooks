import React from "react";
import WebNotification from 'react-web-notifications';

export default () => {
  return (
    <div>
    <WebNotification
    title="Hello, World!" // the title prop is required
    icon="path/to/image.jpg"
    body="This is a web notification"
    timeout={9000}
    onClickFn={ () => window.open('https://www.google.com/', '_blank') } // open your own site on notification click
/>
    </div>
  )
}
