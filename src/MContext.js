import './App.css';
import './HeroSection.css';
import React,{Component} from 'react';
import HeroSection from './HeroSection';
import './Cards.css';
import APIcall from './APIcall';
import Cards2 from './Cards2';
import Cards3 from './Cards3';
import Cards4 from './Cards4';
import Footer from './Footer';

export const MContext = React.createContext();  //exporting context object
class MyProvider extends Component {
state = {message: ""}
render() {
        return (
            <MContext.Provider value={
            {   state: this.state,
                setMessage: (value) => this.setState({
                            message: value })}}>
            {this.props.children}   //this indicates that all the child tags with MyProvider as Parent can access the global store.
            </MContext.Provider>)
    }
}

class App extends React.Component {
    render() {
            return (
                <div>
                     <MyProvider>
                          <div className="App">
                          <HeroSection/>
                          <APIcall/>

                          </div>
                   </MyProvider>
                </div>
            );
    }
    }

    // import MContext
    // class Child1 extends React.Component {
    // render() {
    //     return (
    //         <div>
    //         <Mcontext.Consumer>
    //         {(context) => (
    //        <button onClick={()=>{context.setMessage("New Arrival")}}>Send</button>
    //        )}
    //         </Mcontext.Consumer>
    //         </div>
    //     ) }
    // }

    // import MContext
    // class Child2 extends React.Component {
    // render() {
    //        return (
    //          <div>
    //             <Mcontext.Consumer>
    //              {(context) => (
    //               <p>{context.state.message}}</p>)}
    //             </Mcontext.Consumer>
    //          </div>
    //    )}
    // }