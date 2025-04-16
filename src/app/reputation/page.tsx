'use client';
import React from 'react';
import SearchBar from '@/components/ui/searchbar';

export default function ComingSoon() {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '90vh', flexWrap: 'wrap' }} >
            <div className='w-[80%]'><SearchBar></SearchBar></div>

            <h1 className='font-bold text-9xl'>Coming Soon</h1>
        </div >
    );
}
