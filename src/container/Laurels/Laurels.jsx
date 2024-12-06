import { useState, useEffect } from 'react';
import { urlFor, client } from '../../client';
import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Laurels.css';

const AwardCard = ({ imgUrl, title, subtitle }) => (
  <div className="app__laurels_awards-card">
    <img src={urlFor(imgUrl)} alt="awards" />
    <div className="app__laurels_awards-card_content">
      <p className="p__cormorant" style={{ color: '#DCCA87' }}>{title}</p>
      <p className="p__opensans">{subtitle}</p>
    </div>
  </div>
);

const Laurels = () => {
  const [awards, setAwards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = `*[_type == "awards"]{imgUrl, title, subtitle}`;
    
    client.fetch(query)
      .then((data) => setAwards(data))
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err);
      });
  }, [])
  if (error) {
    return <div>Error loading menu: {error.message}</div>;
  }

  return (
    <div className="app__bg app__wrapper section__padding" id="awards">
      <div className="app__wrapper_info">
        <SubHeading title="Awards & recognition" />
        <h1 className="headtext__cormorant">Our Laurels</h1>
  
        <div className="app__laurels_awards">
          {awards.map((award, index) => <AwardCard key={index} imgUrl={award.imgUrl} title={award.title} subtitle={award.subtitle} />)}
        </div>
      </div>
  
      <div className="app__wrapper_img">
        <img src={images.laurels} alt="laurels_img" />
      </div>
    </div>
  );
}

export default Laurels;
