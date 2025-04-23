'use client';
import React from 'react';
import SearchBar from '@/components/ui/searchbar';
import { FileText } from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from 'react';
import { useEffect, useRef } from 'react';

const PRICE_CHART_ID = 'price-chart-widget-container';

declare global {
  interface Window {
    createMyWidget?: any;
  }
}

async function searchToken(tokenAddress: string, setToken: any) {
  const url = `https://api.rugcheck.xyz/v1/tokens/${tokenAddress}/report`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: any = await response.json();

    try {
      const response = await fetch(data?.tokenMeta?.uri);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      console.log(data);
      data.image = res?.image;
    } catch (error) { }

    console.log(data)
    toast.success("'" + data?.tokenMeta?.name + "' data found", {
      action: {
        label: "close",
        onClick: () => { },
      },
    })

    setToken(data);
    return data;
  } catch (error) {
    toast.error("Token not found !", {
      action: {
        label: "close",
        onClick: () => { },
      },
    })
    setToken({});
    return null;
  }
}

export default function Home() {
  const [token, setToken] = useState<any>({});
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadWidget = () => {
      if (typeof window.createMyWidget === 'function') {
        window.createMyWidget(PRICE_CHART_ID, {
          autoSize: true,
          chainId: 'solana',
          tokenAddress: token?.mint,
          showHoldersChart: true,
          defaultInterval: '1D',
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Etc/UTC',
          theme: 'moralis',
          locale: 'en',
          backgroundColor: '#071321',
          gridColor: '#0d2035',
          textColor: '#68738D',
          candleUpColor: '#4CE666',
          candleDownColor: '#E64C4C',
          hideLeftToolbar: false,
          hideTopToolbar: false,
          hideBottomToolbar: false
        });
      } else {
        console.error('createMyWidget function is not defined.');
      }
    };

    if (!document.getElementById('moralis-chart-widget')) {
      const script = document.createElement('script');
      script.id = 'moralis-chart-widget';
      script.src = 'https://moralis.com/static/embed/chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.onload = loadWidget;
      script.onerror = () => {
        console.error('Failed to load the chart widget script.');
      };
      document.body.appendChild(script);
    } else {
      loadWidget();
    }
  }, [token?.mint]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '90vh', flexWrap: 'wrap' }} >
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', height: '300px' }}>
        <div className='font-bold text-9xl w-full flex justify-center items-center' style={{ textAlign: "center" }}>Investigat <img src="/assets/zoom.png" height="100px" width="150px" />r</div>
        <h2 className='text-2xl'>Your solana tokens investigation tool</h2>
      </div>

      <div className='w-[80%]'><SearchBar onSearch={(tokenAddress: any) => searchToken(tokenAddress, setToken)}></SearchBar></div>

      <div className="card shadow w-[80%]">
        <div className="title">

          <FileText></FileText> General Infos</div>
        <hr className='w-full border-black' />
        <div className="body">



          <div className="data">
            <div className="img-holder">
              <Avatar className="w-20 h-20 shadow">
                <AvatarImage src={token?.fileMeta?.image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className='text-2xl font-bold'>
                {token?.tokenMeta?.name}
              </div>
            </div>
            <div> <span>Mint:</span> {token?.mint} </div>
            <div><span>Symbol:</span>  {token?.fileMeta?.symbol}</div>
            <div><span>Creator:</span>  {token?.creator} </div>
            <div><span>Price:</span> {token?.price} </div>
            <div><span>Supply:</span> {token?.token?.supply}</div>
            <div><span>Holders count:</span> {token?.totalHolders} </div>
            <div><span>Transfer fee:</span> {token?.transferFee?.pct} % </div>
            <div><span>Liquidity:</span> {token?.totalMarketLiquidity}</div>
          </div>

          <div style={{ width: "50%", height: "400px" }}>
            <div
              id={PRICE_CHART_ID}
              ref={containerRef}
              style={{ width: "100%", height: "400px" }}
            />
          </div>
        </div>
      </div>

      {/*<h1 className='font-bold text-9xl'>Coming Soon</h1>*/}
    </div >
  );
}
