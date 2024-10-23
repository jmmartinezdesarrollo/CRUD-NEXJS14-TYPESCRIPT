import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <p>
        © 2024 {process.env.NEXT_PUBLIC_APP_NAME}. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
