
// import React from 'react';

// const StaticHeroBanner: React.FC = () => {
//   return (
//     <div className="w-full my-8"> {/* Added margin top/bottom for spacing */}
//       <a href="/special-offer" target="_blank" rel="noopener noreferrer">
//         <img
//           src="https://rukminim1.flixcart.com/fk-p-flap/3200/460/image/c6e003e409dd71c8.jpg?q=60" // Replace with your banner image URL
//           alt="Special Summer Sale - Up to 50% Off"
//           className="w-full h-auto object-cover rounded-lg shadow-md"
//           style={{ maxHeight: '300px' }} // Adjust max height as needed
//         />
//       </a>
//     </div>
//   );
// };

// export default StaticHeroBanner;













import React from 'react';

const StaticHeroBanner: React.FC = () => {
  return (
    <div className="w-full my-8">
      {/* --- UPDATED --- The link now goes to an external website and opens in a new tab */}
      <a 
        href="https://www.flipkart.com/big-billion-days-store?param=00000999" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/3200/460/image/c6e003e409dd71c8.jpg?q=60" // Replace with your banner image URL
          alt="Big Billion Days Sale" // Update the alt text
          className="w-full h-auto object-cover rounded-lg shadow-md"
          style={{ maxHeight: '300px' }}
        />
      </a>
    </div>
  );
};

export default StaticHeroBanner;