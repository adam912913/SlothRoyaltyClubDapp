import React from 'react';
import ReactDOM from 'react-dom';
// import Web3Provider from './store/Web3Provider';
// import CollectionProvider from './store/CollectionProvider';
// import MarketplaceProvider from './store/MarketplaceProvider';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// ReactDOM.render(
//   <Web3Provider>
//     <CollectionProvider>
//       <MarketplaceProvider>
//         <App />
//       </MarketplaceProvider>
//     </CollectionProvider>
//   </Web3Provider>, 
//   document.getElementById('root')
// );