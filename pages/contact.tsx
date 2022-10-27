import { Fragment } from 'react';
import Head from 'next/head';

import ContactForm from '../components/contact/contact-form';

function ContactPage() {
  return (
    <Fragment>
      <Head>
        <title>Contact Us</title>
        <meta name='description' content='Send us your messages!' />
      </Head>
      <ContactForm />
    </Fragment>
  );
}

export default ContactPage;
