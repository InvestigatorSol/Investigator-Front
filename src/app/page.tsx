'use client';
import React from 'react';
import SearchBar from '@/components/ui/searchbar';
import { FileText } from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from 'react';


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

          <div className="img-holder">
            <Avatar className="w-20 h-20 shadow">
              <AvatarImage src={token?.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="data">
            <div>Mint: </div>
            <div>Name: </div>
            <div>Symbol: </div>
            <div>Creator: </div>
            <div>Price: </div>
            <div>Rugged: </div>
            <div>Holders count: </div>
            <div>Transfer fee: </div>
            <div>Liquidity: </div>
          </div>

        </div>
      </div>

      {/*<h1 className='font-bold text-9xl'>Coming Soon</h1>*/}
    </div >
  );
}
