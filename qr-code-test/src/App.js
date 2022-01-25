import QRCode from 'qrcode.react';
import { useEffect,useState } from 'react';

const App =({ text}) => {
  const [src,setSrc]= useState('');
 
  useEffect(()=> {
    QRCode.toDataURL(text).then((data) => {
       setSrc(data);
    });
  },[]);

  return <div>
  <img src={src}/>

  </div>;
};

export default App;
