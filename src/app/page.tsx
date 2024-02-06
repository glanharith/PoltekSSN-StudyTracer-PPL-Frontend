import { env } from 'process';
import React from 'react';

async function getData() {
  try {
    const res = await fetch(`${env.API_URL}/hello/bob`);
    return 'Response from back end: ' + (await res.text());
  } catch (error) {
    console.error('Fetch error:', error);
    return 'An error occurred while fetching data.';
  }
}

export default async function Home() {
  const data = await getData();
  return (
    <div>
      <h1>Hello World!</h1>
      <h2>{data}</h2>
    </div>
  );
}
