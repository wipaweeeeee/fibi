import React, { useEffect, useState, useRef } from 'react';
import './App.scss';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Features from './components/features/Features';
import Clients from './components/clients/Clients';
import Career from './components/career/Career';
import Contact from './components/contact/Contact';
import Nav from './components/nav/Nav';

import ReactGA from 'react-ga';
var Airtable = require('airtable');

const initializeReactGA = () => {
    ReactGA.initialize(process.env.REACT_APP_GA);
    ReactGA.pageview('home');
    console.log("<3")
}

function App() {

  const [ about, setAbout ] = useState([]);
  const [ features, setFeatures ] = useState([]);
  const [ clients, setClients ] = useState([]);
  const [ careers, setCareers ] = useState([]);
  const [ contact, setContact ] = useState([]);

  let aboutSec = useRef();
  let featuresSec = useRef();
  let clientsSec = useRef();
  let careersSec = useRef();
  let contactSec = useRef();

  const retrieveContent = () => {
    
    var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE);

    base('content').select().eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {

          let section = record.get('section');

          //categorize content by sections
          if (section == "about") {
            setAbout(prevState => ([...prevState, record]));
          } else if (section === "feature") {
            setFeatures(prevState => ([...prevState, record]));
          } else if (section === "clients") {
            setClients(prevState => ([...prevState, record]));
          } else if (section === "careers") {
            setCareers(prevState => ([...prevState, record]));
          } else if (section === "contact") {
            setContact(prevState => ([...prevState, record]));
          }

        });

        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }

    });
  } 

  useEffect(() => {
    retrieveContent();
    initializeReactGA();
  }, []);

  return (
    <div className="container">
      <Nav about={aboutSec} features={featuresSec} clients={clientsSec} careers={careersSec} contact={contactSec}/>
      <Hero />
      <About content={about} _ref={aboutSec}/>
      <Features content={features} _ref={featuresSec} />
      <Clients content={clients} _ref={clientsSec}/>
      <Career content={careers} _ref={careersSec}/>
      <Contact content={contact} _ref={contactSec}/>
    </div>
  );
}

export default App;