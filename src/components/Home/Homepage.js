import video from '../../asset/videos/hero.mp4';

function Homepage() {
    return (
        <div className="homepage-container">
            <div className='hero-module'>
                <div className='hero-module-grid'>
                    <div className='hero-module-media'>
                        <video muted autoPlay loop>
                            <source src={video} />
                        </video>
                    </div>
                    <div className='hero-module-content'>
                        <h1 className='hero-module--title'>
                            Make forms<br />
                            worth filling out
                        </h1>
                        <p className='hero-module-body'><span>Get more data—like signups, feedback, and anything else—with forms designed to be <strong>refreshingly different.</strong></span></p>
                        <div className='hero-module-action'>
                            <a className='hero-signup' href="/signup/">Get started—it's free</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Homepage;