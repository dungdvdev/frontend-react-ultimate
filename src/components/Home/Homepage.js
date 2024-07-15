import video from '../../asset/videos/hero.mp4';

function Homepage() {
    return (
        <div className="homepage-container">
            <video muted autoPlay loop>
                <source src={video} />
            </video>
        </div>
    );
}

export default Homepage;