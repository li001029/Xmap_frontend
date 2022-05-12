//////////////////////////////////////////////////////////////////////////
import React,{useState} from 'react';
import './HeroSection.css';
import "./App.css";
import './button.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
import './Cards.css';
import * as atlas from 'azure-maps-control';
import WeatherAPI from './componenets/weatherAPI'
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
  import {useParams,BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
  import detailPage from './detailPage';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text:"",
      trails: [],
      error: null,
      isLoaded: true,//false
      lat:"",
      lon:"",
      popupOptions:{},
      popupProperties:{},
    };
  }



  getpoi (search,city,State,country) {

    fetch('https://api.openweathermap.org/geo/1.0/direct?q='+city+','
    +State+','+country+'&appid=308f55416ac8415d74c54aca01205022',
    )
      .then((response) => response.json())
      .then((data) => {
        const newLat= data[0].lat.toString();
        const newLon= data[0].lon.toString();
        this.setState({lat:newLat,lon:newLon});
        fetch('https://atlas.microsoft.com/search/poi/json?api-version=1.0&query='
        +search+
        '&subscription-key=SJ740NtjRi6RDR2eojq6VHfCv-0U8WhBYKZkG-rNnhA&lat='+newLat+'&lon='+newLon+'&radius=10000',
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("data is"+data.results[0].poi.name);
            const newResult= data;
            this.setState({trails:newResult});
          });

      });
      console.log("search type is "+search);
  };



  componentDidMount () {
    this.getpoi(this.props.search,this.props.city,this.props.state,this.props.country);
  }




  render () {
      console.log("final lat is "+this.state.lat);
      console.log("final lon is "+this.state.lon);
    if (this.state.trails.length==0) {
      return <div>Unfortunately there's no result for your search...</div>;
    } else {
      return (
        <div >
          <p>
            Trails around your searched location:

            {this.state.trails.results.map((trail) => (
<div>

                 <h3> {trail.poi.name}</h3>

              <Link to={{pathname: "/detailPage", state: trail }} >
                <Button variant="success" className="btn-primary">detail</Button>
            </Link>


        <br/>
        <br />
</div>
            ))}
            </p> 
        </div>
//         <div >
//           <p>
//             Trails around your searched location:
//             <CardGroup>
//             {this.state.trails.results.map((trail) => (
// <div>
//                 <Card>
//                 <CardBlock>
//                   <CardTitle>
//                   {trail.poi.name}
//                   </CardTitle>

//                 </CardBlock>
//                 <CardFooter className="text-xs-center">
//                 <br />
//                 </CardFooter>
//               </Card>

//               <Link to={{pathname: "/detailPage", state: trail }} >
//                 <Button variant="primary" className="btn-primary">detail</Button>
//             </Link>


//         <br/>
//         <br />
// </div>
//             ))}
//             </CardGroup>
//             </p> 
//         </div>
      );
    }
  }
}

class HeroSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { type: "", cityname:"", statename:"", countryname:"",formSubmit: false };
    this.handleInput = this.handleInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }


  handleInput (event) {
    const value = event.target.value;
    this.setState({
        ...this.state,
        [event.target.name]: value
    //   type: event.target.value,
    });
    console.log("updated is"+this.state.cityname);
  }

  handleFormSubmit (event) {
    event.preventDefault()
    this.setState({formSubmit: true})
  }

  render () {
    return (
    
      <div className="App">
        <form onSubmit={this.handleFormSubmit}>
          <label style={{text_align:"center"}}>
            
            <input
              type="text"
              name="type"
              placeholder="Trails or parks?"
              onChange={this.handleInput}
              style={{width: "200px", height: "25px", borderRadius: '100px'}} 
            />
          </label>
          <br />
          <br />
          <label style={{text_align:"center"}}>
            
            <input
              type="text"
              name="cityname"
              placeholder="Input city name"
              onChange={this.handleInput}
              style={{width: "200px", height: "25px", borderRadius: '100px'}} 
            />
          </label>
          <br />
          <br />
          <label style={{text_align:"center"}}>
            
            <input
              type="text"
              name="statename"
              placeholder="Input state code"
              onChange={this.handleInput}
              style={{width: "200px", height: "25px", borderRadius: '100px'}} 
            />
          </label>
          <br />
          <br />
          <label style={{text_align:"center"}}>
            
            <input
              type="text"
              name="countryname"
              placeholder="Input country code"
              onChange={this.handleInput}
              style={{width: "200px", height: "25px", borderRadius: '100px'}} 
            />
          </label>
          <br />
          <br />
          <button type="submit" class="button button6">Search</button>
        </form>
        {this.state.formSubmit && <Map search={this.state.type} city={this.state.cityname}
         state={this.state.statename} country={this.state.countryname} />}
        <h2>Search weather information for a location:</h2>
       <WeatherAPI/>
       <br/>
       <br/>
      </div>
    );
  }
}


export default HeroSection;
