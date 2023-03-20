import MainNavbar from './MainNavbar';
import HomeHero from './HomeHero';
import HomeFeatures from './HomeFeatures';
import {Parallax} from 'react-parallax';
import bg1 from '../assets/medp2.jpg';
import bg2 from '../assets/medp3.jpg';

function Home() {
    return (
        <div>
            <MainNavbar />
            <Parallax
                bgImage={bg1}
                strength={500}
                renderLayer={() => (
                    <HomeHero />
                )}>
                <div style={{
                    height: window.innerWidth < 768 ? '200vh' : '150vh'
                }}></div>
            </Parallax>
            <Parallax
                bgImage={bg2}
                strength={500}
                renderLayer={() => (
                    <HomeFeatures />
                )}>
                <div style={{
                    height: window.innerWidth < 768 ? '500vh' : '200vh'
                }}></div>
            </Parallax>
        </div>
    );
}

export default Home;