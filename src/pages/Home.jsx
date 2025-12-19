import React from 'react';
import Banner from '../Components/Banner';
import TrustedApps from '../Components/TrustedApps';
import TopApps from '../Components/TopApps';
import DocumentTitle from '../Components/DocumentTitle';

const Home = () => {
    DocumentTitle('Home | MyHeroApp');
    return (
        <div>
            <Banner></Banner>
            <TrustedApps></TrustedApps>
            <TopApps></TopApps>
        </div>
    );
};

export default Home;