import * as React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

export interface FooterSocialIconProps {
  iconName: string;
  sx: any;
}

export function FooterSocialIcon({ iconName, sx }: FooterSocialIconProps) {
  switch (iconName) {
    case 'Facebook':
      return <FacebookIcon sx={{ ...sx }} />;
    case 'Instagram':
      return <InstagramIcon sx={{ ...sx }} />;
    case 'Youtube':
      return <YouTubeIcon sx={{ ...sx }} />;
    case 'Twitter':
      return <TwitterIcon sx={{ ...sx }} />;
    default:
      return <FacebookIcon sx={{ ...sx }} />;
  }
}
