import { useEffect, useState } from 'react';
import { urlFor, client } from '../../client';
import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Chef.css';

const Chef = () => {
  const [chef, setChef] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryChef = `*[_type == "chef"][0]{title, body, body2, name, position, sign, imgUrl}`; // Query for data

    // Fetch data
    client
      .fetch(queryChef)
      .then((data) => {
        setChef(data); // Set data
        console.log("Fetched data:", data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err);
      });
  }, []);

  // Display error if it occurs
  if (error) {
    return <div>Error loading content: {error.message}</div>;
  }

  // Display loading until data are fetched
  if (!chef) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app__bg app__wrapper section__padding">
      <div className="app__wrapper_img app__wrapper_img-reverse">
        <img src={urlFor(chef.imgUrl)} alt="chef_image" />
      </div>
      <div className="app__wrapper_info">
        <SubHeading title="Chef's word" />
        <h1 className="headtext__cormorant">{chef.title}</h1>
  
        <div className="app__chef-content">
          <div className="app__chef-content_quote">
            <img src={images.quote} alt="quote_image" />
            <p className="p__opensans">{chef.body}</p>
          </div>
          <p className="p__opensans"> {chef.body2} </p>
        </div>
  
        <div className="app__chef-sign">
          <p>{chef.name}</p>
          <p className="p__opensans">{chef.position}</p>
          <img src={urlFor(chef.sign)} alt="sign_image" />
        </div>
      </div>
    </div>
  );
}

export default Chef;
