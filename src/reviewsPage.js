import React from 'react';
import './App.css';
import './Cards.css';
//import { Button,CardGroup } from 'react-bootstrap';
import { Button,  CardBody, Container, Form, Input, InputGroup} from 'reactstrap';
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
import Header from './detailPageHeader';
import Footer from './Footer';
import { string } from 'prop-types';


class ReviewsPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        reviews: [],
        error: null,
        isLoaded: true,
      };
    }
  
    getreviews () {
      console.log("review page of this location: "+this.props.location.state.id);
        const url='https://xmap.azurewebsites.net/api/reviews/'+this.props.location.state.id;
        console.log("url is "+url);
        fetch(url,{
        method: "get"}
        ).then((Response) => Response.json())
          .then((Result) => {
              //console.log("submit review result is "+Result.message);
              this.setState({reviews:Result.data});
              console.log("reviews length now is "+Result.data.length);
              console.log("reviews now is "+Result.data);
          Object.entries(Result.data[0]).map(([key, value]) => {
             console.log(key+" value is "+value); 
        });
    
          })
    };
  
    componentDidMount () {
      this.getreviews();
    }

    render () {
      console.log("State reviews length now is "+this.state.reviews.length);
      if (this.state.reviews.length==0) {
        return (<div>
          <img   src='https://static.onecms.io/wp-content/uploads/sites/28/2020/07/10/yosemite-national-park-falls-trail-CALIHIKES0720.jpg'/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <h1>Reviews:</h1>
          <h1>There's no review yet! Go create one!</h1>
          </div>)
      } 
      else {
        return (
          <div >
              <img   src='https://static.onecms.io/wp-content/uploads/sites/28/2020/07/10/yosemite-national-park-falls-trail-CALIHIKES0720.jpg'/>
              <h1>Reviews:</h1>
            <p>
              {this.state.reviews.map((review) => (
                <div>
                    <Container className='d-flex justify-content-center header'>
                        <Row className="App">
                            <Col md="13" lg="20" xl="15">
                                <Card className="mx-4">
                                    <CardBody className="p-4">

                            <Button  color="primary" >Comment date: {review.activity_date}</Button><br /><br />
                            <Button  color="success" >Author: {review.author}</Button><br /><br />
                            <Button  color="warning" >Rating: {review.rating}</Button><br /><br />
                            <Button  color="success" >Comment: {review.comment}</Button><br /><br />
                <br />
                                </CardBody>
                            </Card>
                            </Col>
                        </Row>
                    </Container>
                   {/* <p>Comment date: {review.activity_date}</p>
                   <p>Author: {review.author}</p>
                   <p>Comment: {review.comment}</p>
                   <p>Rating: {review.rating}</p>
                    <br/> */}
                    <br />
                </div>
              ))}
            </p> 
          </div>
        );
      }
    }
  }
  export default ReviewsPage;


