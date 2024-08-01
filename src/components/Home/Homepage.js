import { useSelector } from 'react-redux';
import video from '../../asset/videos/hero.mp4';
import { useNavigate } from 'react-router-dom';
function Homepage() {
    const isAuthenicated = useSelector(state => state.user.isAuthenicated);
    // const account = useSelector(state => state.user.account);
    const navigate = useNavigate();
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
                            {isAuthenicated === false
                                ? <button className='hero-signup' onClick={() => { navigate('/login') }}>Login Quiz Now</button>
                                : <button className='hero-signup' onClick={() => { navigate('/users') }}>Doing Quiz Now</button>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Homepage;