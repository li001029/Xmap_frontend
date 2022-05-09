import React from 'react';
import './App.css';
import './Cards.css';
import { Button,CardGroup } from 'react-bootstrap';
import {
  Card,
  CardBlock,
  CardFooter,
  CardTitle,
  CardText,
} from 'react-bootstrap-card';

import {
  Col,
  Row,
} from 'react-bootstrap';
import {useLocation, BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
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
  import Header from './detailPageHeader';
  import Footer from './Footer';


export default function DetailPage() {
    const location = useLocation();
    console.log(location.state);
  return(
    <div >
    <img   src='https://static.onecms.io/wp-content/uploads/sites/28/2020/07/10/yosemite-national-park-falls-trail-CALIHIKES0720.jpg'/>
    <Header />
    {/* <CardGroup>
    <Card>
    <CardBlock>
        <CardTitle> */}
        <h2>{location.state.poi.name}</h2>
        {/* </CardTitle> */}
            <p>Distance: {location.state.dist}</p>
            <p>Categories: {location.state.poi.categories[0]}</p>
            <p>Score: {location.state.score}</p><br />
            <p>Address: {location.state.address.freeformAddress}</p>
            <br />
    {/* </CardBlock>
    <CardFooter className="text-xs-center">
    <br />
    </CardFooter>
    </Card> */}

<AzureMapsProvider>
<div style={{ height: "400px",width:"400px",margin:"auto",background: '#fff'  }}>
  <AzureMap options={{
    authOptions: {
      authType: AuthenticationType.subscriptionKey,
      subscriptionKey: 'SJ740NtjRi6RDR2eojq6VHfCv-0U8WhBYKZkG-rNnhA'
    },
    center: [location.state.position.lon,  location.state.position.lat],//-76.5, 42.4
    zoom: 15,
    view: "Auto"
  }}>
    <AzureMapDataSourceProvider
      id={"MultiplePoint AzureMapDataSourceProvider"}
    >
      
          <AzureMapFeature
          key={location.state.poi.name}
          id={location.state.poi.name}
          type="Point"
          //coordinate={[-76.5, 42.4]}
          coordinate={[location.state.position.lon, location.state.position.lat]}
        />      
      )
      <AzureMapLayerProvider
        id={"MultiplePoint AzureMapLayerProvider"}
        options={{
          iconOptions: {
            image: "pin-red"
          }
        }}
        type="SymbolLayer"
      />
    </AzureMapDataSourceProvider>
  </AzureMap>
</div>
</AzureMapsProvider>
{/* </CardGroup> */}
<br/>
<br/>
<div className="App">
<h2>Leave a review here: </h2>
<textarea
          //value={this.state.textAreaValue}
          //onChange={this.handleChange}
          rows={10}
          cols={100}
        />
<br/><br/>
<Button variant="success">submit review</Button>
</div>
<br/>
<br/>
<Footer />
</div>
)
      }
