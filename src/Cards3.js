// import React from 'react';
// import './Cards.css';
// import amap from './azuremap';
// function Cards3() {
//   return (
    
//     <div className='cards2'>
//       <h1>——— Experiences ———</h1>
      


  

//     </div>
//   );
// }

// export default Cards3;

import "./mapstyles.css";

import React, { memo, useMemo, useState,useEffect } from "react";
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureMapOptions,
  AzureMapPopup,
  IAzureMapFeature
} from "react-azure-maps";
import {
  AuthenticationType,
  data,
  MapMouseEvent,
  PopupOptions
} from "azure-maps-control";
import { carData } from "./mapdata";


export default function App() {
  
const renderPoint = (data) => {
  return (
    <AzureMapFeature
      key={data.licensePlate}
      id={data.licensePlate}
      type="Point"
      // coordinate={data}
      coordinate={[data.position.longitude, data.position.latitude]}
      properties={{
        id: data.licensePlate,
        popUpProp: data
      }}
    />
  );
};

const MarkersExample = () => {
  const [mapData, setMapData] = useState([...carData]);
  // const [mapData, setMapData] = useState([...points]);
  const [popupOptions, setPopupOptions] = useState({});
  const [popupProperties, setPopupProperties] = useState({});

  const option = useMemo(() => {
    return {
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: 'SJ740NtjRi6RDR2eojq6VHfCv-0U8WhBYKZkG-rNnhA'
      },
      center: [-76.5, 42.4],
      zoom: 10,
      view: "Auto"
    };
  }, []);

  const memoizedMarkerRender = useMemo(
    () => mapData.map((el) => renderPoint(el)),
    [mapData]
  );
  //////////////////////////////////////////////////////////////////////////////
 
  /////////////////////////////////////////////////////////////////////////////////
  return (
    <>
    <div >
      <h2>Check out your park location on map below:</h2>
      <AzureMapsProvider>
        <div style={{ height: "400px",width:"800px",margin:"auto",background: '#fff'  }}>
          <AzureMap options={option}>
            <AzureMapDataSourceProvider
              id={"MultiplePoint AzureMapDataSourceProvider"}
            >
              <AzureMapLayerProvider
                id={"MultiplePoint AzureMapLayerProvider"}
                options={{
                  iconOptions: {
                    image: "pin-red"
                  }
                }}
                events={{
                  mousemove: (e) => {
                    if (e.shapes && e.shapes.length > 0) {
                      const prop = e.shapes[0];

                      // Set popup options
                      setPopupOptions({
                        ...popupOptions,
                        position: new data.Position(
                          prop.data.geometry.coordinates[0],
                          prop.data.geometry.coordinates[1]
                        ),
                        pixelOffset: [0, -18]
                      });

                      if (prop.data.properties)
                        // Set popup properties from Feature Properties that are declared on create Feature
                        setPopupProperties({
                          ...prop.data.properties.popUpProp
                        });
                        // <h3>{popupProperties.licensePlate}</h3>
                    }
                  }
                }}
                type="SymbolLayer"
              />
              {memoizedMarkerRender}
            </AzureMapDataSourceProvider>
            <AzureMapPopup
              isVisible={true}
              options={popupOptions}
              popupContent={
                <div style={{ padding: "8px 16px" }}>
                  <h3>{popupProperties.licensePlate}</h3>
                  <p>{popupProperties.model}</p>
                </div> // Inject your JSX
              }
            />
          </AzureMap>
        </div>
      </AzureMapsProvider>
      </div>
    </>
  );
};


  return (
    <div className="App">
      <MarkersExample />
      <br/>
      <br/>
    </div>
  );
}
