// import React from 'react'

// const Footer = () => {
//   return (
  
//       <footer className="mt-20 p-20 bg-gray-800 text-white py-4">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-wrap justify-between items-center">
//             <div className="text-center md:text-left">
//               <h5 className="text-lg font-semibold">ShopSphere</h5>
//               <p className="text-sm mt-2">
//                 © {new Date().getFullYear()} ShopSphere. All rights reserved.
//               </p>
//             </div>
//             <div className="text-center mt-4 md:mt-0">
//               <ul className="flex justify-center space-x-4">
//                 <li><a href="/" className="hover:underline">Home</a></li>
//                 <li><a href="/" className="hover:underline">About</a></li>
//                 <li><a href="/" className="hover:underline">Services</a></li>
//                 <li><a href="/" className="hover:underline">Contact</a></li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </footer>
   
//   )
// }

// export default Footer


















// import React from 'react';
// import { Grid, Typography, Link, IconButton } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import XIcon from '@mui/icons-material/X';
// import YouTubeIcon from '@mui/icons-material/YouTube';

// const socialLinks = [
//   { name: 'Facebook', icon: <FacebookIcon />, href: 'https://www.facebook.com/your-page' },
//   { name: 'Instagram', icon: <InstagramIcon />, href: 'https://www.instagram.com/your-profile' },
//   { name: 'X (Twitter)', icon: <XIcon />, href: 'https://www.x.com/your-handle' },
//   { name: 'YouTube', icon: <YouTubeIcon />, href: 'https://www.youtube.com/your-channel' },
// ];

// const Footer = () => {
//   return (
//     // --- UPDATED --- Main container now uses your primary green background and white text.
//     <div className="bg-[#00927c] text-white">
//       {/* Top section with main links */}
//       <Grid container spacing={4} className="px-5 lg:px-20 py-20" justifyContent="space-between">
//         {/* Company Column */}
//         <Grid item xs={12} sm={4}>
//           <Typography variant="h6" className="font-bold pb-2">Company</Typography>
//           <Link href="#" color="inherit" display="block" underline="hover">About Us</Link>
//           <Link href="#" color="inherit" display="block" underline="hover">Careers</Link>
//           <Link href="#" color="inherit" display="block" underline="hover">Press</Link>
//         </Grid>

//         {/* Help Column */}
//         <Grid item xs={12} sm={4}>
//           <Typography variant="h6" className="font-bold pb-2">Help</Typography>
//           <Link href="#" color="inherit" display="block" underline="hover">Contact Us</Link>
//           <Link href="#" color="inherit" display="block" underline="hover">Support</Link>
//           <Link href="#" color="inherit" display="block" underline="hover">Shipping</Link>
//         </Grid>

//         {/* Legal Column */}
//         <Grid item xs={12} sm={4}>
//           <Typography variant="h6" className="font-bold pb-2">Legal</Typography>
//           <Link href="#" color="inherit" display="block" underline="hover">Claim</Link>
//           <Link href="#" color="inherit" display="block" underline="hover">Privacy</Link>
//           <Link href="#" color="inherit" display="block" underline="hover">Terms</Link>
//         </Grid>
//       </Grid>

//       {/* --- UPDATED --- Social media bar now inherits the green background */}
//       <div className="border-t border-white border-opacity-20">
//         <div className="flex flex-col md:flex-row items-center justify-between px-5 lg:px-20 py-4">
//           <Typography variant="h6" className="font-bold mb-4 md:mb-0">
//             Connect With Us
//           </Typography>
//           <div className="flex items-center space-x-2">
//             {socialLinks.map((social) => (
//               <a 
//                 key={social.name}
//                 href={social.href}
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="text-white hover:text-gray-200 transition-colors duration-300"
//               >
//                 <IconButton color="inherit">
//                   {social.icon}
//                 </IconButton>
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* --- UPDATED --- Copyright Section now inherits the green background */}
//       <div className="border-t border-white border-opacity-20 py-4 px-5 lg:px-20 text-center">
//         <Typography variant="body2" className="text-gray-200">
//           © {new Date().getFullYear()} ShopSphere, Inc. All rights reserved.
//         </Typography>
//       </div>
//     </div>
//   );
// };

// export default Footer;









import React from 'react';
import { Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';

const socialLinks = [
  { name: 'Facebook', icon: <FacebookIcon />, href: 'https://www.facebook.com/your-page' },
  { name: 'Instagram', icon: <InstagramIcon />, href: 'https://www.instagram.com/your-profile' },
  { name: 'X (Twitter)', icon: <XIcon />, href: 'https://www.x.com/your-handle' },
  { name: 'YouTube', icon: <YouTubeIcon />, href: 'https://www.youtube.com/your-channel' },
];

const Footer = () => {
  return (
    // --- UPDATED --- Main container now has the dark background and white text
    <div className="bg-gray-800 text-white">
      {/* Top section with main links */}
      <Grid container spacing={4} className="px-5 lg:px-20 py-20" justifyContent="space-between">
        {/* Company Column */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" className="font-bold pb-2">Company</Typography>
          <Link href="#" color="inherit" display="block" underline="hover">About Us</Link>
          <Link href="#" color="inherit" display="block" underline="hover">Careers</Link>
          <Link href="#" color="inherit" display="block" underline="hover">Press</Link>
        </Grid>

        {/* Help Column */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" className="font-bold pb-2">Help</Typography>
          <Link href="#" color="inherit" display="block" underline="hover">Contact Us</Link>
          <Link href="#" color="inherit" display="block" underline="hover">Support</Link>
          <Link href="#" color="inherit" display="block" underline="hover">Shipping</Link>
        </Grid>

        {/* Legal Column */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" className="font-bold pb-2">Legal</Typography>
          <Link href="#" color="inherit" display="block" underline="hover">Claim</Link>
          <Link href="#" color="inherit" display="block" underline="hover">Privacy</Link>
          <Link href="#" color="inherit" display="block" underline="hover">Terms</Link>
        </Grid>
      </Grid>

      {/* --- UPDATED --- Social media bar now has a slightly darker background for contrast */}
      <div className="bg-gray-900">
        <div className="flex flex-col md:flex-row items-center justify-between px-5 lg:px-20 py-4">
          <Typography variant="h6" className="font-bold mb-4 md:mb-0">
            Connect With Us
          </Typography>
          <div className="flex items-center space-x-2">
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.href}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-colors duration-300"
              >
                <IconButton color="inherit">
                  {social.icon}
                </IconButton>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* --- UPDATED --- Copyright Section now has a matching dark background */}
      <div className="bg-gray-900 border-t border-gray-700 py-4 px-5 lg:px-20 text-center">
        <Typography variant="body2" className="text-gray-400">
          © {new Date().getFullYear()} ShopSphere, Inc. All rights reserved.
        </Typography>
      </div>
    </div>
  );
};

export default Footer;

















