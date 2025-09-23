import {Link} from 'react-router';

export default function Index() {
  return (
    <div className="">
      <h1 className="">Home</h1>
      <p>
        <Link className="" to="/collections/all">
          All Products
        </Link>
      </p>
    </div>
  );
}