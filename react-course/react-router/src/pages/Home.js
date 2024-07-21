import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate('products');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the home page.</p>
      <p>
        Go to <Link to="products">the products</Link>
      </p>
      <button onClick={navigateHandler}>Go to the products</button>
    </div>
  );
}

export default HomePage;
