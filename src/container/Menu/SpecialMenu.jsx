import { useState, useEffect } from 'react';
import { client } from '../../client';
import { SubHeading, MenuItem } from '../../components';
import { images } from '../../constants';
import './SpecialMenu.css';

const SpecialMenu = () => {
  const [wines, setWines] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = `*[_type == "wines"]{title, tag, price}`;
    const query2 = `*[_type == "cocktails"]{title, tag, price}`;
    
    client.fetch(query)
      .then((data) => setWines(data))
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err);
      });

      client.fetch(query2)
      .then((data) => setCocktails(data))
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err);
      });
  }, [])
  if (error) {
    return <div>Error loading menu: {error.message}</div>;
  }
  
  return (
    <div className="app__specialMenu flex__center section__padding" id="menu">
      <div className="app__specialMenu-title">
        <SubHeading title="Menu that fits your palatte" />
        <h1 className="headtext__cormorant">Today&apos;s Special</h1>
      </div>
  
      <div className="app__specialMenu-menu">
        <div className="app__specialMenu-menu_wine  flex__center">
          <p className="app__specialMenu-menu_heading">Wine & Beer</p>
          <div className="app__specialMenu_menu_items">
            {wines.map((wine, index) => (
              <MenuItem key={index} title={wine.title} price={wine.price} tags={wine.tag} />
            ))}
          </div>
        </div>
  
        <div className="app__specialMenu-menu_img">
          <img src={images.menu} alt="menu__img" />
        </div>
  
        <div className="app__specialMenu-menu_cocktails  flex__center">
          <p className="app__specialMenu-menu_heading">Cocktails</p>
          <div className="app__specialMenu_menu_items">
            {cocktails.map((cocktail, index) => (
              <MenuItem key={index} title={cocktail.title} price={cocktail.price} tags={cocktail.tag} />
            ))}
          </div>
        </div>
      </div>
  
      <div style={{ marginTop: 15 }}>
        <button type="button" className="custom__button">View More</button>
      </div>
    </div>
  );
}

export default SpecialMenu;
