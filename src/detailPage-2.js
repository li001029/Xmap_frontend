import React from 'react';
import './App.css';
import './Cards.css';
import { Button,  CardBody, Container, Form, Input, InputGroup} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
import {withRouter, BrowserRouter as Router, Link } from 'react-router-dom';
import {
    AzureMap,
    AzureMapDataSourceProvider,
    AzureMapFeature,
    AzureMapLayerProvider,
    AzureMapsProvider,
    IAzureMapOptions,
  } from "react-azure-maps";
  import {
    AuthenticationType,
  } from "azure-maps-control";
  import Header from './detailPageHeader';
  import Footer from './Footer';


class DetailPage extends React.Component {  
// Constructor 
constructor() {
    super();
    this.state = {
      rating: '',
      activity_date: '',
      activity_year: '',
      activity_month: '',
      comment: '',
      park_id: ''
    }
    this.rating = this.rating.bind(this);
    this.activity_date = this.activity_date.bind(this);
    this.activity_year = this.activity_year.bind(this);
    this.activity_month= this.activity_month.bind(this);
    this.comment = this.comment.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  rating(event) {
    this.setState({rating: event.target.value });
  }

  activity_date(event) {
    this.setState({ activity_date: event.target.value })
  }
  activity_year(event) {
    this.setState({ activity_year: event.target.value })
  }
  activity_month(event) {
    this.setState({ activity_month: event.target.value })
  }
  comment(event) {
    this.setState({ comment: event.target.value })
  }



submitReview(event) {
    const userToken = localStorage.getItem("userToken");
    //debugger;
    fetch('https://xmap.azurewebsites.net/api/reviews', { 
      method: 'post',
      headers: {
        'Authorization':'Bearer '+userToken,
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        rating: parseInt(this.state.rating),
        activity_date: this.state.activity_year+'-'+this.state.activity_month+'-'+this.state.activity_date,
        comment: this.state.comment,
        park_id: parseInt(this.props.location.state.id),
        activity_type: 'Hiking'
      })
    }).then((Response) => {Response.json();alert('Success!');})
      .then((Result) => {
          console.log(JSON.stringify({
            rating: parseInt(this.state.rating),
            activity_date: this.state.activity_year+'-'+this.state.activity_month+'-'+this.state.activity_date,
            comment: this.state.comment,
            park_id: parseInt(this.props.location.state.id),
            activity_type: 'Hiking'
          }));
        //   console.log('Authorization:'+'Bearer '+JSON.stringify(userToken));

      })
  }



render() {
    //const {location } = this.props.location.state;
        //   Object.entries(this.props.location.state).map(([key, value]) => {
        //      console.log(key+"value is"+value); 
        // });
    console.log("location is "+this.props.location.state.poi.name);
    return (
        <div >
        <img   src='https://static.onecms.io/wp-content/uploads/sites/28/2020/07/10/yosemite-national-park-falls-trail-CALIHIKES0720.jpg'/>
        <Header />

        <Container className='d-flex justify-content-center header'>
        <Row className="App">
            <Col md="13" lg="20" xl="20">

                <Button  color="primary" >{this.props.location.state.poi.name}</Button><br /><br />
            {/* <h2>{this.props.location.state.poi.name}</h2> */}
           
            <Button  color="success" >Distance: {this.props.location.state.dist}</Button><br /><br />
            <Button  color="warning" >Categories: {this.props.location.state.poi.categories[0]}</Button><br /><br />
            <Button  color="success" >Score: {this.props.location.state.score}</Button><br /><br />
            <Button  color="danger" >Address: {this.props.location.state.address.freeformAddress}</Button>
                {/* <p>Distance: {this.props.location.state.dist}</p>
                <p>Categories: {this.props.location.state.poi.categories[0]}</p>
                <p>Score: {this.props.location.state.score}</p>
                <p>Address: {this.props.location.state.address.freeformAddress}</p> */}
                <br />
            </Col>
          </Row>
        </Container>
    <br/><br/>
    <AzureMapsProvider>
    <div style={{ height: "400px",width:"400px",margin:"auto",background: '#fff'  }}>
      <AzureMap options={{
        authOptions: {
          authType: AuthenticationType.subscriptionKey,
          subscriptionKey: 'SJ740NtjRi6RDR2eojq6VHfCv-0U8WhBYKZkG-rNnhA'
        },
        center: [this.props.location.state.position.lon,  this.props.location.state.position.lat],//-76.5, 42.4
        zoom: 15,
        view: "Auto"
      }}>
        <AzureMapDataSourceProvider
          id={"MultiplePoint AzureMapDataSourceProvider"}
        >
          
              <AzureMapFeature
              key={this.props.location.state.poi.name}
              id={this.props.location.state.poi.name}
              type="Point"
              //coordinate={[-76.5, 42.4]}
              coordinate={[this.props.location.state.position.lon, this.props.location.state.position.lat]}
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

    <br/>
    <br/>

    <div className="App">
    <Link to={{pathname: "/reviewsPage", state: this.props.location.state }} >
                <Button color="success">check reviews</Button>
            </Link>
    <h2>Leave a review here: </h2>
    <Container className='d-flex justify-content-center header'>
        
          <Row className="App">
            <Col md="13" lg="20" xl="20">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <div class="row" className="mb-2 pageheading">
                    
                    </div>
                    <InputGroup className="mb-3">
                      <Input type="text"  onChange={this.rating} placeholder="Enter a number from 1-5 for rating" />
                    </InputGroup>
                    
                    <InputGroup className="mb-4">
                      <Input type="text"  onChange={this.activity_year} placeholder="Enter current year" />
                    </InputGroup>

                     <InputGroup className="mb-4">
                      <Input type="text"  onChange={this.activity_month} placeholder="Enter current month" />
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <Input type="text"  onChange={this.activity_date} placeholder="Enter current date" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                                    <textarea
                            //value={this.state.textAreaValue}
                            placeholder="Enter comments here"
                            onChange={this.comment}
                            rows={10}
                            cols={100}
                            />
                    </InputGroup>
                    
                    <Button onClick={this.submitReview} color="success" >submit review</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

    <br/><br/>
    
    </div>
    <br/>
    <br/>
    <Footer />
    </div>
);
}
}

export default withRouter(DetailPage);