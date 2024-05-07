import {useEffect, useRef} from 'react';
import style from './Nav.module.css';
import { Link } from 'react-router-dom';
export default function  Nav() {
  const alignerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!alignerRef.current || !headerRef.current) return;

    const height = headerRef.current.clientHeight;
    alignerRef.current.style.height = `${height}px`;
  }, [])
  return (
    <>
      <div
        className={style.contentAligner}
        ref={alignerRef}
      ></div>
      <header
        className={style.header}
        ref={headerRef}
      >
        <nav
          className={style.nav}
        >
          <Link
            className={style.logoContainer}
            to='/'
          >
            <span
              className={style.siteTitle}
            >
              FOOD PLACE
            </span>
            <img className={style.logo} src='/logo.png' />
          </Link>
        </nav>
      </header>
    </>
  )
}
