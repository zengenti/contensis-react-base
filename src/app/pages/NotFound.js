import React from 'react';
import Link from 'app/components/shared/Link/Link';
const NotFound = () => (
  <>
    <header>
      <h1>404 Page Not Found</h1>
    </header>
    <main>
      Go to <Link to="/">home</Link>
    </main>
  </>
);
export default NotFound;
