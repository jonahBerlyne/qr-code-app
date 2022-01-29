import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./Redux/Store";
import { Provider } from "react-redux";

// const AppWrapper = ({ children }) => {
//   return (
//     <Provider store={store}>{children}</Provider>
//   );
// }

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  // {/* </React.StrictMode>, */}
  document.getElementById('root')
);
