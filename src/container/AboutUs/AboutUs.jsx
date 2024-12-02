import { useEffect, useState } from 'react';
import { urlFor, client } from '../../client';
import { images } from '../../constants';
import './AboutUs.css';

const AboutUs = () => {
  const [about, setAbout] = useState(null); 
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(null); 

  useEffect(() => {
    const queryAbout = `*[_type == "about"][0]{title, body, imgUrl}`; // Query for data
    const queryHistory = `*[_type == "history"][0]{title, body}`; // Query for data

    // Fetch data
    client
      .fetch(queryAbout)
      .then((data) => {
        setAbout(data); // Set data
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err);
      });

      client
      .fetch(queryHistory)
      .then((data) => {
        setHistory(data); // Set history data
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err);
      });
  }, []);
    

  if (error) {
    return <div>Error loading content: {error.message}</div>;
  }

  // Display loading until data are fetched
  if (!about) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app__aboutus app__bg flex__center section__padding" id="about">
      <div className="app__aboutus-overlay flex__center">
        <img src={images.G} alt="G_overlay" />
      </div>
  
      <div className="app__aboutus-content flex__center">
        <div className="app__aboutus-content_about">
          <h1 className="headtext__cormorant">{about.title}</h1>
          <img src={images.spoon} alt="about_spoon" className="spoon__img" />
          <p className="p__opensans">{about.body}</p>
          <button type="button" className="custom__button">Know More</button>
        </div>
  
        <div className="app__aboutus-content_knife flex__center">
          <img src={urlFor(about.imgUrl)} alt="about_knife" />
        </div>
  
        <div className="app__aboutus-content_history">
          <h1 className="headtext__cormorant">{history.title}</h1>
          <img src={images.spoon} alt="about_spoon" className="spoon__img" />
          <p className="p__opensans">{history.body}</p>
          <button type="button" className="custom__button">Know More</button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
