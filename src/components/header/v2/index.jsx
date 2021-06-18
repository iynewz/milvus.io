import React, { useState, useRef } from 'react';
import milvusLogo from '../../../images/v2/milvus-logo.svg';
import milvusLogoMobile from '../../../images/v2/milvus-logo-mobile.svg';
import lfai from '../../../images/v2/lfai.svg';
import close from '../../../images/v2/close.svg';
import menu from '../../../images/v2/menu.svg';
import { useMobileScreen } from '../../../hooks';
import MobilePopup from '../components/MobilePopupV2';
import Search from '../components/Search';
import QuestionRobot from '../../questionRobot';
import Menu from '../components/Menu/Menu';
import { useClickOutside } from '../../../hooks';
import * as styles from './index.module.less';
import { globalHistory } from '@reach/router';
import LangSelector from '../../selector/v2';
import { LANGUAGES, NAVLIST_EN, NAVLIST_CN } from './constants';
import LocalizedLink from '../../localizedLink/localizedLink';


const V2Header = props => {
  const {
    type = 'home',
    className = '',
    locale,
  } = props;
  const navList = locale === 'en' ? NAVLIST_EN : NAVLIST_CN;
  const { pathname } = globalHistory.location;
  const { isMobile } = useMobileScreen();

  const [maskConfig, setMaskConfig] = useState({
    isOpen: false,
    type: 'close'
  });
  const container = useRef(null);
  const headContainer = useRef(null);

  const handleToggleMask = ({ isOpen }) => {
    const type = isOpen ? 'menu' : 'close';
    setMaskConfig({
      isOpen,
      type
    });
  };

  const hideMask = () => {
    setMaskConfig({
      isOpen: false,
      type: '',
    });
  };

  useClickOutside(container, () => {
    hideMask();
  });

  const LinkContent = ({ label, icon }) => (
    <>
      {
        icon ? (
          icon
        ) : label
      }
    </>
  );

  return (
    <header className={`${styles.header} ${className}`} ref={headContainer}>
      <div className={styles.firstHeader}>
        <div className={styles.headerContainer} ref={container}>
          {!isMobile ? (
            <div className={styles.contentWrapper}>
              <div className={styles.logoSection}>
                <LocalizedLink to="/" locale={locale}>
                  <img
                    className={styles.milvus}
                    src={milvusLogo}
                    alt="milvus-logo"
                  />
                </LocalizedLink>
                <a
                  href="https://lfaidata.foundation/projects/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className={styles.lfai} src={lfai} alt="lfai-icon" />
                </a>
              </div>
              <div className={styles.navSection}>
                {navList.map(i => {
                  const { label, link, isExternal, keyWord } = i;
                  return isExternal ? (
                    <a
                      className={styles.navItem}
                      href={link}
                      key={label}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {label}
                    </a>
                  ) : (
                    <LocalizedLink
                      className={`${styles.navItem} ${pathname.includes(keyWord) ? styles.active : ''
                        }`}
                      to={link}
                      key={label}
                      locale={locale}
                    >
                      {label}
                    </LocalizedLink>
                  );
                })}
                <a
                  className={styles.navItem}
                  href='https://github.com/milvus-io/milvus/'
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className={`fab fa-github ${styles.navIcon}`}></i>
                </a>
                <div className={styles.dropDown}>
                  <LangSelector options={LANGUAGES} locale={locale} />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.mobileHeaderWrapper}>
              <div className={styles.logoSection}>
                <LocalizedLink to="/" locale={locale}>
                  <img
                    className={styles.milvus}
                    src={milvusLogoMobile}
                    alt="milvus-logo"
                  />
                </LocalizedLink>
                <a
                  href="https://lfaidata.foundation/projects/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className={styles.lfai} src={lfai} alt="lfai-icon" />
                </a>
              </div>
              <div className={styles.menuSection}>
                <div
                  className={styles.menuWrapper}
                >
                  <div
                    className={styles.iconWrapper}
                    data-type={maskConfig.type === 'menu' ? 'close' : 'menu'}
                  >
                    {
                      maskConfig.isOpen ? (
                        <img
                          role="button"
                          tabIndex={-1}
                          onClick={() => handleToggleMask({ isOpen: false })}
                          onKeyDown={() => handleToggleMask({ isOpen: false })}
                          className={styles.btnIcon}
                          src={close}
                          alt="close-icon"
                        />
                      ) : (
                        <img
                          role="button"
                          tabIndex={-1}
                          onClick={() => handleToggleMask({ isOpen: true })}
                          onKeyDown={() => handleToggleMask({ isOpen: true })}
                          className={styles.btnIcon}
                          src={menu}
                          alt="close-icon"
                        />
                      )
                    }
                  </div>
                </div>
              </div>
              <MobilePopup
                className={styles.v2Popup}
                open={maskConfig.isOpen}
                hideMask={hideMask}
              >
                {maskConfig.type === 'menu' ? (
                  <Menu
                    options={LANGUAGES}
                    navList={navList}
                    locale={locale}
                  />
                ) : (
                  <Search />
                )}
              </MobilePopup>
            </div>
          )}
        </div>
      </div>
      <QuestionRobot />
    </header>
  );
};

export default V2Header;