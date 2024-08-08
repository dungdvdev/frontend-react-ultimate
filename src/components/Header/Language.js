import { useTranslation } from 'react-i18next';
import { NavDropdown } from "react-bootstrap";

function Language() {
    const { i18n } = useTranslation();
    // const [titleLanguage, setTitleLanguage] = useState('Việt Nam');
    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
    }
    return (
        <>
            {/* {Object.keys(lngs).map((lng) => (
                <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                    {lngs[lng].nativeName}
                </button>
            ))} */}
            <NavDropdown title={i18n.language === 'vi' ? 'Việt Nam' : 'English'} id="basic-nav-dropdown-lang" className='languages'>
                <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Việt Nam</NavDropdown.Item>
            </NavDropdown>
        </>
    );
}

export default Language;