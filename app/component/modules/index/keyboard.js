import React from 'react';
import Keyboard, {KeyboardButton, LatinLayout} from 'react-screen-keyboard';


const MyComponent = ({inputNode, goBack, submit}) =>
  <Keyboard
    inputNode={inputNode}
    layouts={[LatinLayout]}
  />

export default MyComponent;