import { Seo } from '@/components/common/seo';
import { HelpInformation } from '@/components/contact/help-infomation';
import { StrapiData } from '@/models';
import { ContactPageData } from '@/models/contact';
import { fetchAPI } from '@/utils';
import { Box, Container, Stack, Typography } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export interface ContactPageProps {
  contactData: StrapiData<ContactPageData>;
}

export default function ContactPage({ contactData }: ContactPageProps) {
  const { seo, pageHeader, mapSource, helpInfo } = contactData?.attributes;

  return (
    <>
      {seo && <Seo metadata={seo} />}
      <Container sx={{ mb: 9 }}>
        <Typography
          fontFamily='Cormorant Garamond'
          fontSize='3rem'
          textAlign='center'
          fontWeight={700}
          mt={6}
          mb={3}
        >
          {pageHeader}
        </Typography>

        {mapSource && (
          <Stack>
            <Box
              component='iframe'
              src={mapSource}
              width={{ lg: '950px', xs: '100%' }}
              height='500px'
              sx={{ margin: 'auto', border: 0 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            />
          </Stack>
        )}

        <HelpInformation helpInformationData={helpInfo} />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const contactPage = await fetchAPI('/contact-page', {
    populate: ['seo.metaImage', 'seo.metaSocial.image', 'helpInfo.helpItems'],
  });

  const contactData = contactPage.data;

  if (!contactData) {
    return {
      notFound: true,
    };
  }

  return { props: { contactData } };
};
