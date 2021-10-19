import React from 'react';
import Link from "next/link";

const Navbar = () => {
    return (
        <React.Fragment>
            <nav style={{position: "sticky"}} id="menu"
                 className="custom-navbar navbar navbar-expand-lg sticky-top navbar-light bg-light">
                <div className="container">
                    <Link href="/">
                        <a className="navbar-brand custom-brand">
                            Ahmet Eren BOYACI
                        </a>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link href="/">
                                    <a className="nav-link">
                                        ana sayfa
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/blog">
                                    <a className="nav-link">
                                        blog
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/hakkimda">
                                    <a className="nav-link">
                                        hakkımda
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/iletisim">
                                    <a className="nav-link">
                                        İLETİŞİM
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <style jsx>
                {`
                .bg-light {
                  background-color: #fff !important;
                }`}
            </style>
        </React.Fragment>
    );
};

export default Navbar;