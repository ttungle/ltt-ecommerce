import { HelpInformationData } from '@/models/contact';
import { Box, Grid, Typography } from '@mui/material';

export interface HelpInformationProps {
  helpInformationData: HelpInformationData;
}

export function HelpInformation({ helpInformationData }: HelpInformationProps) {
  const { header, helpItems } = helpInformationData;
  return (
    <Box mt={5}>
      <Typography
        fontFamily='Cormorant Garamond'
        textAlign='center'
        fontSize='2rem'
        fontWeight={700}
        mb={3}
      >
        {header}
      </Typography>

      <Grid container spacing={5}>
        {helpItems.map((item: any) => (
          <Grid
            key={item.id}
            item
            lg={4}
            xs={12}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <Typography fontWeight={500} letterSpacing='0.16rem' mb={2}>
              {item?.title}
            </Typography>
            <Typography color='text.secondary' textAlign='center'>
              <Box dangerouslySetInnerHTML={{ __html: item?.description }}></Box>
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
