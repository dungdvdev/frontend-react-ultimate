import { useSelector } from 'react-redux';
import video from '../../asset/videos/hero.mp4';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Homepage() {
    const { t } = useTranslation();
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
                        <h1 className='hero-module--title'>{t('homepagetitle1')}</h1>
                        <p className='hero-module-body'><span>{t('homepagetitle2')}</span></p>
                        <div className='hero-module-action'>
                            {isAuthenicated === false
                                ? <button className='hero-signup' onClick={() => { navigate('/login') }}>{t('homepagebtnlogin')}</button>
                                : <button className='hero-signup' onClick={() => { navigate('/users') }}>{t('homepagebtnusers')}</button>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Homepage;