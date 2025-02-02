import React from 'react';

export default function Home({ data }: { data: string }) {
  return (
    <div>
      <h1>Hello World!</h1>
      <h2>{data}</h2>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch(`${process.env.API_URL}/hello/yudisabri`);
    const data = 'Response from back end: ' + (await res.text());
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: 'An error occurred while fetching data!',
      },
    };
  }
}
