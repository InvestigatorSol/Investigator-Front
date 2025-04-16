'use client';
import React from 'react';
import SearchBar from '@/components/ui/searchbar';
import { FileText, Globe2, AlertCircle, Vote, UserSearch } from "lucide-react"
import { toast } from "sonner"

async function searchToken(tokenAddress: string) {
  const url = `https://api.rugcheck.xyz/v1/tokens/${tokenAddress}/report`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    toast.error("Token not found !", {
      action: {
        label: "close",
        onClick: () => { },
      },
    })
    return null;
  }
}

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '90vh', flexWrap: 'wrap' }} >
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', height: '300px' }}>
        <div className='font-bold text-9xl w-full flex justify-center items-center' style={{ textAlign: "center" }}>Investigat <img src="/assets/zoom.png" height="100px" width="150px" />r</div>
        <h2 className='text-2xl'>Your solana tokens investigation tool</h2>
      </div>

      <div className='w-[80%]'><SearchBar onSearch={searchToken}></SearchBar></div>

      <div className="card shadow w-[80%]">
        <div className="title"><FileText></FileText> General Infos</div>
        <hr className='w-full border-black' />
      </div>

      {/*<h1 className='font-bold text-9xl'>Coming Soon</h1>*/}
    </div >
  );
}
