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



const  RenderTrails = async () => {
    let [text, setText] = useState('["not empty"]');
    let [trails, setTrails] = useState([]);
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState(null);
    useEffect(() => setTrails(trails), []);

    try {
        const response = await fetch('https://atlas.microsoft.com/search/poi/json?api-version=1.0&query=hiking%20trail&subscription-key=SJ740NtjRi6RDR2eojq6VHfCv-0U8WhBYKZkG-rNnhA&lat=42.444&lon=-76.5019&radius=100000');
        const data = await response.json();
        setTrails([...data]);

        // await fetch('https://atlas.microsoft.com/search/poi/json?api-version=1.0&query=hiking%20trail&subscription-key=SJ740NtjRi6RDR2eojq6VHfCv-0U8WhBYKZkG-rNnhA&lat=42.444&lon=-76.5019&radius=100000')
        // .then((response) => {
        //   console.log("response"+response);
        //   setTrails([response.json()]);
         console.log("trail1"+data);

          //return response.json();
        //})

    //     .then(console.log('trail'+trails));
    // }//)

      // const response = await fetch('https://atlas.microsoft.com/search/poi/json?api-version=1.0&query=hiking%20trail&subscription-key=SJ740NtjRi6RDR2eojq6VHfCv-0U8WhBYKZkG-rNnhA&lat=42.444&lon=-76.5019&radius=100000');
      // const data = await response.json();
      // // this.setState({ trails: data, isLoading: false });
      // setTrails(trails,data);
      // setIsLoading(isLoading,false);

    }

     catch (error) {
      // this.setState({ error: error.message, isLoading: false });
      setError(error,error.message);
     setIsLoading(isLoading,false);
    }

    

    if (error) {
      return <div>{error}</div>;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }
    console.log("y");
    return  (
      <div >
          <p>text:{text}</p>
        <p>First: {trails.length}</p>
        {/* <p> Second: {trails}</p> */}
        {/* <p> Second: {trails.results[1].poi.name}</p> */}
      </div>
    );
  };

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

  //async
//   const componentDidMount = async ()=> {
//     try {
//       const response = await fetch('https://atlas.microsoft.com/search/poi/json?api-version=1.0&query=hiking%20trail&subscription-key=SJ740NtjRi6RDR2eojq6VHfCv-0U8WhBYKZkG-rNnhA&lat=42.444&lon=-76.5019&radius=100000');
//       const data = await response.json();
//       // this.setState({ trails: data, isLoading: false });
//       setTrails(trails,data);
//       setIsLoading(isLoading,false);

//     } catch (error) {
//       // this.setState({ error: error.message, isLoading: false });
//       setError(error,error.message);
//       setIsLoading(isLoading,false);
//     }
//   }


  /////////////////////////////////////////////////////////////////////////////////
  return (
    <>
    <div style={{ background: '#fff'  }}>
    <form action="/" method="get">
        <label htmlFor="header-search">
            {/* <span className="visually-hidden">Search blog posts</span> */}
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search trails around you"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
    {RenderTrails()}

      <p>Check out your park location on map:</p>
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
    </div>
  );
}