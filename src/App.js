import React, { useEffect, useState } from 'react';
import './App.scss';
// import Hero from './assets/hero_8.mp4';
import About from './components/about/About';
import Features from './components/features/Features';
import Clients from './components/clients/Clients';
import Career from './components/career/Career';

var Airtable = require('airtable');

function App() {

  const [ about, setAbout ] = useState([]);
  const [ features, setFeatures ] = useState([]);
  const [ clients, setClients ] = useState([]);
  const [ careers, setCareers ] = useState([]);
  const [ contact, setContact ] = useState([]);

  const retrieveContent = () => {
    
    var base = new Airtable({apiKey: 'keywJEKrRFRrPEmMI'}).base('appdaQadn3bwFXmNC');

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
  }, []);

  return (
    <div className="container">
    {/*<div className="hero">  
      <video autoPlay loop src={Hero} />
    </div>
    */}
    <About content={about} />
    <Features content={features} />
    <Clients content={clients} />
    <Career content={careers} />
    </div>
  );
}

export default App;