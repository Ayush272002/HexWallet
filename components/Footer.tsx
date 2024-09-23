import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto border-t px-4">
      <div className="flex justify-between py-8">
        <p className="text-primary tracking-tight">
          Designed and Developed by{' '}
          <Link href={'https://github.com/Ayush272002'} className="font-bold">
            Ayush
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
