import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <div className={"footer"}>
            <p>Önerileriniz için <Link href={"/iletisim"}><a>iletişim</a></Link>'e geçebilirsiniz.</p>
        </div>
    );
};

export default Footer;