
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-gray-700/50 py-4">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-gray-300 text-sm">
          Copyright{' '}
          <a
            href="https://github.com/OgeeTech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 underline hover:no-underline"
          >
            OGTech
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
