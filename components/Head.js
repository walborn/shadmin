import React from 'react';
import NextHead from 'next/head';

const Head = props => (
  <NextHead>
      <meta charSet="UTF-8" />
      <title>{props.title}</title>
      <meta name="keywords" content={props.keywords} />
      <meta name="description" content={props.description} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" sizes="192x192" href="/touch-icon.png" />
      <link rel="apple-touch-icon" href="/touch-icon.png" />
      <link rel="mask-icon" href="/favicon-mask.svg" color="#49B882" />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:url" content={props.url} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta name="twitter:site" content={props.url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={props.ogImage} />
      <meta property="og:image" content={props.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap&subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet" />
  </NextHead>
)

Head.defaultProps = {
  title: 'Shadmin',
  description: 'Shala admin panel',
  url: '',
  ogImage: '/favicon-mark@1200x630.png',
  keywords: '',
}

export default Head
