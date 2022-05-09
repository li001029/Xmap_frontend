import "./mapstyles.css";

import React, { memo, useMemo, useState,useEffect,Component } from "react";
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


export default class APP extends Component{
  
renderPoint = (data) => {
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

state = {mapData:carData, popupOptions:{}, popupProperties:{}, text:'["not empty"]', trails: [], isLoading: true, error: null };

MarkersExample = () => {
//   const [mapData, setMapData] = useState([...carData]);
//   const [popupOptions, setPopupOptions] = useState({});
//   const [popupProperties, setPopupProperties] = useState({});

   option = useMemo(() => {
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

   memoizedMarkerRender = useMemo(
    () => mapData.map((el) => this.renderPoint(el)),
    [mapData]
  );
  //////////////////////////////////////////////////////////////////////////////

//   const [text, setText] = useState('["not empty"]');
//   const [trails, setTrails] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
 

  //async
  // const componentDidMount = async ()=> {
  //   try {
  //     const response = await fetch('https://atlas.microsoft.com/search/poi/json?api-version=1.0&query=hiking%20trail&subscription-key=SJ740NtjRi6RDR2eojq6VHfCv-0U8WhBYKZkG-rNnhA&lat=42.444&lon=-76.5019&radius=100000');
  //     const data = await response.json();
  //     // this.setState({ trails: data, isLoading: false });
  //     setTrails(trails,data);
  //     setIsLoading(isLoading,false);

  //   } catch (error) {
  //     // this.setState({ error: error.message, isLoading: false });
  //     setError(error,error.message);
  //     setIsLoading(isLoading,false);
  //   }
  // }

  //async
RenderTrails = () => {
    try {
      //useEffect(() => {
        fetch('https://atlas.microsoft.com/search/poi/json?api-version=1.0&query=hiking%20trail&subscription-key=SJ740NtjRi6RDR2eojq6VHfCv-0U8WhBYKZkG-rNnhA&lat=42.444&lon=-76.5019&radius=100000')
        .then((response) => {
          console.log(response);
          this.setState(trails, response.json());
          //return response.json();
        })
        // .then((json) => {
        //   console.log(json);
        // })
        // .then((json) => {
        //   setTrails(trails,json);
        // })
        .then(console.log('trail'+trails));

        // .then(res => res.json())
        // .then(
        //     res => setTrails(trails,res)
        // )
        // .then(console.log(res))
    }//)

      // const response = await fetch('https://atlas.microsoft.com/search/poi/json?api-version=1.0&query=hiking%20trail&subscription-key=SJ740NtjRi6RDR2eojq6VHfCv-0U8WhBYKZkG-rNnhA&lat=42.444&lon=-76.5019&radius=100000');
      // const data = await response.json();
      // // this.setState({ trails: data, isLoading: false });
      // setTrails(trails,data);
      // setIsLoading(isLoading,false);

    //}

     catch (error) {
      // this.setState({ error: error.message, isLoading: false });
      this.setState(error,error.message);
     this.setState(isLoading,false);
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
        <p>First: {trails.results.summary}</p>
        {/* <p> Second: {trails.results[1].poi.name}</p> */}
      </div>
    );
  };

  // const render=()=> {
  //   return <div>{renderTrails()}</div>;
  // }
  
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
    <div>{this.RenderTrails()}</div>
    {/* <div >
          <p>text:{text}</p>
        <p>First: {trails.results[0].poi.name}</p>
        <p> Second: {trails.results[1].poi.name}</p>
      </div> */}

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
                      this.setState({
                        ...popupOptions,
                        position: new data.Position(
                          prop.data.geometry.coordinates[0],
                          prop.data.geometry.coordinates[1]
                        ),
                        pixelOffset: [0, -18]
                      });

                      if (prop.data.properties)
                        // Set popup properties from Feature Properties that are declared on create Feature
                        this.setState({
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

// return (
//     <div className="App">
//       <MarkersExample />
//     </div>
//   );
}
