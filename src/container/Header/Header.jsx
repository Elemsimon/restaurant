import { useEffect, useState } from 'react';
import { urlFor, client } from '../../client'; // Ensure this points to your Sanity client setup
import { SubHeading } from '../../components';
import './Header.css';

const Header = () => {
  const [hero, setHero] = useState(null); // State for hero data
  const [error, setError] = useState(null); // State for errors

  useEffect(() => {
    const queryHero = `*[_type == "hero"][0]{title, body, imgUrl}`; // Query for hero data

    // Fetch hero data
    client
      .fetch(queryHero)
      .then((data) => {
        setHero(data); // Set hero data
        console.log("Fetched hero data:", data);
      })
      .catch((err) => {
        console.error('Error fetching hero data:', err);
        setError(err);
      });
  }, []);

  // Display error if it occurs
  if (error) {
    return <div>Error loading content: {error.message}</div>;
  }

  // Display loading until data are fetched
  if (!hero) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app__header app__wrapper section__padding" id="home">
      <div className="app__wrapper_info">
        <SubHeading title="Chase the new flavour" />
        <h1 className="app__header-h1">{hero.title}</h1>
        <p className="p__opensans" style={{ margin: '2rem 0' }}>
          {hero.body}
        </p>
        <button type="button" className="custom__button">Explore Menu</button>
      </div>

      <div className="app__wrapper_img">
        <img src={urlFor(hero.imgUrl)} alt="header_img" />
      </div>
    </div>
  );
};

export default Header;
