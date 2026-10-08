// ─── lib/data.js — All static data for the Truus website ─────────────────────
// ES Module exports — imported by React components

// Marquee brand logos — edit this array directly to add/remove/reorder logos.
// Drop image files into /public/assets/Work/ and reference them below (WebP keeps them light).
export const brands = [
    { name: "Rajsaaga", src: "/assets/Work/rajsaaga.webp" },
    { name: "Regulus", src: "/assets/Work/regulus.webp" },
    { name: "TEDx Sreyas Institute", src: "/assets/Work/tedx-sreyas.webp" },
    { name: "WhatsApp City", src: "/assets/Work/whatsapp-city.webp" },
    { name: "Frufresh", src: "/assets/Work/frufresh.webp" },
    { name: "Raaha Retreat", src: "/assets/Work/raaha-retreat.webp" },
    { name: "RestnRevel", src: "/assets/Work/restnrevel.webp" }
];

// Marquee tile backgrounds — kept to paper tones so the client logos carry the colour
export const colors = [
    "#ffffff",
    "var(--paper-deep)",
    "var(--paper-light)"
];

// Footer social icon links + SVG markup
export const SOCIAL_ICONS = [
    {
        href: 'https://www.linkedin.com/company/truus/',
        label: 'LinkedIn',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none" data-wiggle-target="" aria-hidden="true"><path d="M35.9969 11.5666C35.9721 11.0166 35.8451 10.4418 35.9164 9.88408C36.0248 9.1955 36.0031 8.51315 35.856 7.82457C35.5029 5.31796 33.4912 3.9003 31.0288 4.22901C29.4848 4.3365 27.9935 4.33494 26.4603 4.23212C25.0355 4.21654 23.6092 4.20875 22.1845 4.11528C21.5278 4.06855 20.8511 4.18695 20.213 4.17604C18.5869 4.09503 16.9299 4.00623 15.3007 4C14.2074 4.07634 13.1063 3.96417 12.0222 4.12775C10.5943 4.13553 9.13087 3.81617 7.73089 4.21966C5.8756 4.53902 4.31146 5.98317 4.46013 7.96166C4.47717 8.73593 4.34089 9.50084 4.30217 10.2735C4.37186 11.3469 4.32385 12.4234 4.32076 13.4952C4.33624 13.9049 4.40283 14.3162 4.39974 14.7259C4.39354 15.2992 4.12408 15.8289 4.16434 16.3991C4.26346 18.0115 4.23093 19.6379 4.17828 21.2596C4.19067 22.3315 4.25107 23.4064 4.22009 24.4689C4.25262 25.6404 4.08226 26.801 4.00018 27.9647C3.99399 29.1814 4.14421 30.4075 4.39664 31.5992C4.5004 32.2489 4.50969 32.9608 4.89066 33.5248C5.22517 34.0716 5.81366 34.4766 6.32471 34.8895C6.64838 35.1465 6.98134 35.4098 7.3778 35.5391C8.50522 35.7946 9.69768 35.5827 10.8437 35.7042C11.9804 35.8024 13.0985 35.8647 14.2383 35.8117C16.5799 35.98 18.9416 35.9161 21.294 35.8818C23.2283 35.8008 25.1703 36.0376 27.1045 35.8678C28.9227 35.846 30.7795 36.2168 32.5651 35.8039C33.7064 35.3646 34.9128 34.6246 35.3341 33.4017C35.5695 32.7131 35.6066 31.9778 35.6531 31.2565C35.7956 29.0334 35.8018 26.8166 35.7042 24.5982C35.8467 23.1073 35.7971 21.5852 35.8715 20.0835C36.0232 17.2512 35.8513 14.4097 36 11.5915V11.5619L35.9969 11.5666ZM9.43286 12.1227C9.42666 11.5681 9.50255 10.9948 9.82157 10.5353C10.4209 9.63793 11.7047 9.08177 12.651 9.64884C14.0928 10.339 14.3901 12.4951 13.289 13.5996C13.0459 13.8551 12.716 13.9657 12.366 13.9844C11.6846 13.9844 10.8421 14.2041 10.2691 13.7741C9.81693 13.3519 9.42821 12.7802 9.43286 12.1492V12.1212V12.1227ZM13.9936 18.7452C13.9782 18.9493 13.9209 19.1503 13.8775 19.3513C13.718 20.0944 13.8883 20.8624 13.8574 21.6164C13.7861 23.6292 13.7335 25.6544 13.8109 27.6703C13.8403 28.4149 13.8728 29.1658 13.8992 29.9105C13.9658 30.624 13.5848 31.1272 12.86 31.1926C12.0423 31.2752 11.22 31.2783 10.3961 31.1817C10.1886 31.1552 9.97024 31.0851 9.82931 30.9371C9.52578 30.6084 9.57069 30.0211 9.55985 29.5833C9.57688 28.7312 9.6187 27.8401 9.54127 26.9879C9.49945 26.5362 9.57998 26.089 9.56295 25.6373C9.40189 24.1417 9.37866 22.6259 9.3229 21.121C9.34613 20.1177 9.47003 19.1145 9.501 18.1081C9.55675 17.5675 9.40808 16.7013 10.057 16.5066C11.0961 16.3742 12.1415 16.4162 13.2255 16.3601C13.7613 16.3477 13.9472 16.6639 13.9038 17.2045C13.8465 17.7155 14.0076 18.2125 13.9967 18.7203V18.7484L13.9936 18.7452ZM31.1667 27.6111C31.097 28.3713 31.1403 29.1658 31.0877 29.9292C31.0877 30.3561 30.795 30.6957 30.366 30.7299C29.4074 30.8795 28.4395 30.7408 27.4514 30.7814C27.0689 30.8187 26.7561 30.691 26.7638 30.2501C26.7437 28.6112 26.8552 26.9568 26.5377 25.335C26.4634 24.9518 26.468 24.5639 26.4928 24.176C26.5439 23.3784 26.2884 22.5979 26.2698 21.808C26.2466 21.3422 26.2698 20.7923 25.957 20.4215C24.9984 19.5164 23.6371 19.2905 22.519 20.0492C20.9533 21.0088 21.3126 23.1182 21.1624 24.6994C21.1701 25.2743 21.0617 25.8336 21.0183 26.4006C21.1747 27.7264 21.0369 29.1082 21.0648 30.4402C21.0849 30.853 20.7411 31.0555 20.3663 31.0524C19.3752 31.1256 18.4243 31.2004 17.4673 31.269C17.3031 31.2783 17.1126 31.2643 16.9856 31.1771C16.8432 31.0883 16.7998 30.8686 16.8075 30.6848C16.8199 30.3358 16.8633 29.9697 16.8463 29.6098C16.7162 28.0909 16.6233 26.5844 16.7146 25.0515C16.7502 23.6074 16.6914 22.1601 16.5737 20.7222C16.7162 19.4151 16.6279 18.0909 16.5814 16.773C16.5706 16.3944 16.8122 16.2137 17.1544 16.1919C18.333 16.061 20.0938 16.1124 20.9858 16.3041C21.5139 16.4022 21.1004 16.8244 21.0462 17.2918C21.0354 17.3821 21.0307 17.4834 21.0431 17.5706C21.0725 17.904 21.3343 17.9492 21.5557 17.7389C22.1922 17.0908 22.9325 16.4131 23.8229 16.1265C25.2601 15.6124 26.959 15.6389 28.1127 16.7574C29.7249 17.9352 29.8735 18.1221 30.7067 19.9666C31.3246 21.1475 31.3355 22.4623 31.2023 23.746C31.1729 24.3785 31.1883 25.0297 31.145 25.6747C31.1465 26.3305 31.3091 26.9412 31.1744 27.5799L31.1713 27.6095L31.1667 27.6111Z" fill="currentColor"/></svg>'
    },
    {
        href: 'https://www.instagram.com/teamtruus/',
        label: 'Instagram',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none" data-wiggle-target="" aria-hidden="true"><path d="M35.9653 20.2209C35.9393 17.6695 36.1018 15.1165 35.8873 12.5586C35.7589 10.8912 35.2828 9.24659 34.3662 7.94651C33.3083 6.48229 31.714 5.09445 29.8338 4.89131C28.719 4.7808 27.7 4.3274 26.5511 4.42165C26.0603 4.4444 25.5776 4.38103 25.0933 4.31765C24.5099 4.26077 23.8973 4.38265 23.3009 4.32902C21.6644 4.22989 20.0263 4.0625 18.3882 4.14213C17.5285 4.01538 16.6525 4.04625 15.7896 4.01538C15.3557 3.98937 14.9202 3.991 14.4895 4.0625C13.2171 4.27539 11.9397 4.51591 10.6673 4.74992C10.1326 4.84906 9.58821 4.97256 9.1023 5.21958C8.34663 5.60961 7.75509 6.27427 7.10017 6.81056C6.78165 7.0982 6.56389 7.46873 6.40463 7.862C6.08123 8.64368 5.6327 9.37823 5.39056 10.1973C5.15329 11.2195 4.80227 12.2205 4.70152 13.2622C4.39275 16.6343 4.00922 19.9983 4.08397 23.3915C4.09535 23.9733 3.98809 24.5551 4.0011 25.1271C4.09698 26.3622 4.38137 27.5859 4.62839 28.7999C4.78277 29.5328 5.03466 30.2446 5.40844 30.8946C6.48263 32.6904 8.01023 34.7851 10.313 34.946C12.9116 35.1947 15.4776 35.7456 18.0891 35.8626C19.5891 35.9016 21.094 36.1697 22.6021 35.9812C23.01 35.9341 23.4162 35.8821 23.8274 35.8626C24.2223 35.8366 24.5652 35.874 24.9113 35.8447C25.5988 35.7764 26.2764 35.5408 26.9622 35.4677C28.3907 35.4027 29.8468 35.2759 31.168 34.7299C33.0629 34.1156 34.0396 32.8805 34.701 31.0506C35.4274 29.2842 35.611 27.3779 35.6452 25.4798C35.7167 24.7469 35.9101 24.0221 35.9279 23.281C35.9588 22.7203 35.8304 22.1564 35.8499 21.6088C35.8629 21.1554 35.9686 20.7052 35.9637 20.2518V20.2209H35.9653ZM33.6642 19.3304C33.5163 20.0584 33.3911 20.7231 33.4301 21.4788C33.2221 23.3704 33.3993 25.2961 33.1913 27.1829C33.1458 28.6114 33.0531 30.2153 31.9594 31.27C31.3858 31.8356 30.7698 32.4011 30.0304 32.6579C29.5543 32.8383 29.0391 32.8789 28.5353 32.9276C27.9633 32.9861 27.4091 33.1308 26.842 33.2153C25.0121 33.4948 23.1822 33.8426 21.3247 33.6541C20.0506 33.6151 18.7749 33.6004 17.5009 33.5501C16.1731 33.4948 14.8536 33.4298 13.5307 33.3274C12.3964 33.2299 11.2361 33.1665 10.2041 32.6757C7.34719 31.3107 6.80603 27.8443 6.58176 25.0101C6.429 22.5416 6.26974 20.0227 6.61264 17.572C6.89703 15.2107 7.20255 12.8543 7.78434 10.5369C8.07361 9.36035 9.04867 8.66481 9.99774 7.98226C10.7307 7.44273 11.5676 7.08358 12.424 6.79918C13.0887 6.52941 13.8249 6.58142 14.5188 6.50341C15.8579 6.25477 17.2165 6.10689 18.5783 6.07764C20.1205 6.06139 21.6676 6.07764 23.2034 6.20602C25.0316 6.43028 26.842 6.75368 28.68 6.91782C29.8939 7.01857 31.0786 7.4931 31.8002 8.52667C32.2828 9.17346 32.7183 9.86413 32.9556 10.6312C33.1246 11.135 33.1197 11.6843 33.1994 12.2108C33.4854 13.2899 33.4838 14.4031 33.5455 15.5114C33.6918 16.3272 33.5797 17.143 33.6203 17.962C33.6495 18.4073 33.7113 18.8575 33.6674 19.3028L33.6642 19.3336V19.3304Z" fill="currentColor"/><path d="M27.7674 17.988C27.3595 16.1712 26.1066 14.6907 24.6391 13.6392C23.7875 13.0591 22.7751 12.6853 21.7318 12.5114C21.2166 12.4253 20.721 12.2482 20.2318 12.253C18.4442 12.3505 16.7622 13.0851 15.3695 14.1934C14.8722 14.5542 14.5147 15.0271 14.1393 15.5146C13.8581 15.8673 13.5607 16.2215 13.356 16.6148C13.0358 17.2145 12.8717 17.8791 12.7384 18.5406C12.5792 19.3174 12.4427 20.1445 12.5174 20.9408C12.7628 23.5703 14.6723 26.2419 17.1246 27.2771C17.8039 27.6103 18.4621 27.8199 19.1999 27.8345C20.7242 28.1547 22.3184 27.9451 23.6413 27.0935C24.4587 26.567 25.3509 26.0876 26.0204 25.366C27.3238 23.8839 28.0144 22.0882 28.0924 20.0649C28.1705 19.345 27.9982 18.721 27.7772 18.0189L27.769 17.9864L27.7674 17.988ZM25.4711 21.2854C25.073 22.54 24.1434 24.2366 22.9311 24.872C22.034 25.3091 21.0249 25.5171 20.0384 25.6407C19.1527 25.6195 18.1874 25.5009 17.4626 25.0264C17.1831 24.8411 16.9296 24.6217 16.6761 24.4007C14.5407 22.7382 14.084 19.6066 15.2752 17.2681C15.493 16.8098 15.8635 16.4539 16.273 16.163C17.2205 15.4756 18.1809 14.8532 19.3201 14.6647C20.1619 14.5038 20.9907 14.7589 21.826 14.8597C23.053 15.0433 23.8217 15.929 24.514 16.857C25.4663 18.0579 25.9083 19.7643 25.4809 21.2561L25.4728 21.287L25.4711 21.2854Z" fill="currentColor"/><path d="M30.2261 11.8094C29.8621 13.3451 28.991 13.766 27.5382 13.1468C26.4754 12.708 26.2137 11.4583 26.971 10.6149C27.4846 10.0396 28.2012 9.35057 29.0414 9.69835C29.2705 9.80885 29.4412 10.0006 29.6281 10.1696C30.1058 10.5759 30.4292 11.1414 30.2326 11.7769L30.2245 11.8077L30.2261 11.8094Z" fill="currentColor"/></svg>'
    },
    {
        href: 'https://www.tiktok.com/@teamtruus',
        label: 'TikTok',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none" data-wiggle-target="" aria-hidden="true"><path d="M35.7673 17.7056C35.5701 16.7041 35.4805 15.6928 35.2035 14.7093C34.9706 13.9378 34.6056 13.2315 34.2195 12.5366C33.5922 11.3378 32.7581 10.2775 31.8962 9.22711C31.2087 8.3773 30.4299 7.59599 29.5322 6.96965C27.8932 5.91758 26.1075 5.03189 24.2519 4.4349C23.302 4.17392 22.3277 4.03038 21.3404 4.04996C20.4753 4.04506 19.6102 3.9733 18.7483 4.01081C17.049 4.05975 15.4019 4.61922 13.8166 5.16074C12.51 5.59951 11.363 6.38082 10.26 7.19148C9.825 7.50628 9.50404 7.9369 9.12769 8.31531C7.22801 10.0394 5.69979 12.2332 4.89495 14.6848C4.6082 15.6194 4.47135 16.572 4.19763 17.5115C4.051 18.0057 3.99398 18.5147 4.0005 19.0285C4.00701 20.1311 3.97117 21.2011 4.15202 22.2874C4.49253 24.9608 5.62973 27.2362 7.15632 29.3844C7.60599 30.0221 8.15504 30.5718 8.61774 31.1982C8.97128 31.6794 9.35741 32.154 9.84455 32.5047C10.304 32.857 10.8351 33.0479 11.3386 33.3431C11.899 33.6693 12.3976 34.1081 13.0069 34.3185C13.4468 34.4653 13.8769 34.6349 14.2858 34.8551C15.3237 35.382 16.5407 35.3624 17.6502 35.6805C18.9389 36.0181 20.2521 36.0899 21.5441 35.8876C22.3799 35.8061 23.2271 35.7637 24.0172 35.457C24.7048 35.1667 25.4835 35.1145 26.176 34.8682C26.4643 34.7605 26.7283 34.6039 26.9906 34.4441C27.8117 33.9319 28.7062 33.529 29.4638 32.9043C30.3468 32.141 31.2413 31.4102 32.0624 30.5718C32.5381 30.0303 32.8069 29.3469 33.3576 28.8641C34.0191 28.1072 34.3205 27.1188 34.8419 26.269C35.2785 25.4208 35.4414 24.4715 35.6402 23.5026C36.0605 21.5632 36.1224 19.7331 35.7738 17.7382L35.7689 17.7056H35.7673ZM28.4602 16.8591C28.3103 17.2326 28.4227 17.8459 28.1425 18.1085C27.204 18.575 25.9984 17.6159 25.2669 17.0467C24.8009 16.6405 24.4571 16.9178 24.4213 17.4805C24.3936 17.7823 24.4474 18.0857 24.4848 18.3874C24.6152 19.3155 24.5793 20.2551 24.5419 21.188C24.4278 23.9071 24.3105 27.4254 21.7282 29.0109C21.0227 29.4284 20.2097 29.5866 19.4049 29.6796C18.5805 29.8329 17.7887 29.8982 16.9887 29.6258C14.3966 29.0386 12.3633 26.7795 12.5784 24.0262C12.5572 23.4031 12.4513 22.7376 12.668 22.1439C13.0981 21.1587 13.6227 20.1833 14.4357 19.4297C15.5518 18.6158 16.8698 17.965 18.2775 17.9372C18.8086 17.9063 19.0676 18.3401 19.0367 18.8246C19.0236 19.3563 19.0106 19.8815 18.9471 20.4019C18.8118 21.1815 17.7968 21.1375 17.2347 21.4849C15.9118 22.139 15.1053 24.7439 15.9607 25.9786C17.0164 27.4287 19.4277 27.2134 20.4997 25.9036C20.648 25.6883 20.7295 25.4273 20.8077 25.1794C21.052 24.3687 21.3714 23.5662 21.3534 22.6985C21.342 22.2532 21.3241 21.8095 21.3925 21.3675C21.6125 19.8962 21.4691 18.4266 21.4561 16.952C21.4561 15.8021 21.6532 14.6522 21.6891 13.5039C21.7102 12.8808 21.6793 12.2642 21.6565 11.6346C21.6418 11.359 21.6923 11.0442 21.9807 10.9332C22.6943 10.7669 23.5659 10.594 24.317 10.6674C24.8221 10.7636 24.9149 11.359 25.0665 11.7798C26.0326 14.9197 29.397 14.078 28.4683 16.8297L28.4602 16.8607V16.8591Z" fill="currentColor"/></svg>'
    }
];

// WhatsApp chat link — the same one the QR code (public/assets/wa_qr_code.png) opens.
export const WHATSAPP_URL = 'https://wa.me/qr/SMG74RYRPYXTD1';

// Service cards data — `diagram` picks the hover sketch (components/CardDiagrams.jsx)
export const CARDS_DATA = [
    {
        color: 'green',
        sticker: 'camera',
        diagram: 'web',
        title: 'web development',
        services: ['Websites', 'Web Apps', 'E-commerce', 'Dashboards']
    },
    {
        color: 'darkblue',
        sticker: 'smiley',
        diagram: 'ai',
        title: 'ai solutions',
        services: ['AI Agents', 'AI Integration', 'Intelligent Systems']
    },
    {
        color: 'orange',
        sticker: 'hand',
        diagram: 'automation',
        title: 'automation',
        services: ['Browser Automation', 'Workflow Automation', 'Data Automation']
    },
    {
        color: 'maroon',
        sticker: 'heart',
        diagram: 'integrations',
        title: 'integrations',
        services: ['APIs', 'Payments', 'CRM', 'Third-Party Systems']
    },
    {
        color: 'pink',
        sticker: 'phone',
        diagram: 'mobile',
        title: 'mobile development',
        services: ['Android', 'iOS', 'Cross-Platform', 'Mobile Apps']
    }
];

// Team section photos — edit this array directly to add/remove/reorder team
// members (no admin page needed). Drop photo files into /public/assets/Team/
// and reference them below. First 4 entries appear in the featured collage on
// the homepage — later entries stack visually on top of earlier ones — any
// beyond 4 show in a grid underneath it. `bgColor` shows through around
// cutout/transparent photos (omit it for plain rectangular photos); `pillColor`
// picks the name pill's color (pink/orange/red/blue) — omit to auto-cycle.
export const TEAM_MEMBERS = [
    { name: 'Shree Pranav', role: 'Co-Founder', photoUrl: '/assets/Team/shree-pranav.webp', bgColor: '#ffffff', pillColor: 'orange' },
    { name: 'Rohan Kumar', role: 'Co-Founder', photoUrl: '/assets/Team/rohan-kumar.webp', bgColor: 'var(--paper-deep)', pillColor: 'pink' },
    { name: 'Siddhu Karan', role: 'Digital Marketing Head', photoUrl: '/assets/Team/siddhu-karan.webp', bgColor: 'var(--accent)', pillColor: 'blue' },
    // { name: 'Jamie Rivera', role: 'Designer', photoUrl: '/assets/Team/jamie.jpg' },
];

// Showreel stats — edit freely, swap in real numbers whenever you have them.
export const STATS_DATA = [
    { value: 10, suffix: '+', label: 'Projects Delivered', color: 'green', sticker: 'camera' },
    { value: 9, suffix: '+', label: 'Happy Clients', color: 'lightblue', sticker: 'phone' },
    { value: 100, suffix: '%', label: 'Client Retention', color: 'pink', sticker: 'heart' },
];

// ─── Our Works ──────────────────────────────────────────────────────────────
// Everything on /work is driven from here — add, remove or reorder entries and
// the page (cards, filters, counts, case-study popup) follows.
//
//   kind        'client project' | 'in-house product' | 'concept build'
//   categorySlug  must match an entry in WORK_CATEGORIES below
//   image       optional. Leave it out and the card draws a typographic cover.
//   imageFit    'contain' → logos / wordmarks, centred on `coverBg`
//               'cover'   → screenshots / photos, fills the whole cover
//               (drop screenshots in /public/assets/Work/ — 16:10 works best)
//   coverBg / coverInk  cover background and text colour
//   highlight   short factual chip on the cover (keep it something you can back up)
//   repo / live optional links shown in the case-study popup
export const WORK_CATEGORIES = [
    { label: 'AI & Automation', slug: 'ai' },
    { label: 'Web Experiences', slug: 'web' },
    { label: 'Apps & Tools', slug: 'apps' },
];

export const OUR_WORKS = [
    {
        id: 'regulus',
        client: 'regulus',
        title: 'multi-model ai workbench',
        kind: 'in-house product',
        category: 'AI & Automation',
        categorySlug: 'ai',
        badgeClass: 'badge-orange',
        image: '/assets/Work/regulus.webp',
        imageFit: 'contain',
        coverBg: '#161616',
        subtitle: 'One prompt in, a plan out — each step routed to the AI model best suited to it.',
        summary: 'Regulus is an AI orchestration platform. It breaks a request into a task plan, sends every task to the right model across five providers, verifies the output and falls back to another model when one fails.',
        deliverables: ['AI Planner', 'Model Router', 'Execution Engine', 'Usage Analytics'],
        highlight: '5 AI providers',
        highlights: [
            'Routes across OpenAI, Anthropic, Gemini, Groq and OpenRouter',
            'Automatic retries, fallback chains and output verification per task',
            'Learns per-provider success rate and latency to route smarter',
            'Accounts, prompt history and bring-your-own API keys',
        ],
        year: '2026',
        challenge: 'No single AI model is best at everything, and juggling several providers by hand means separate keys, separate consoles and no safety net when one is down or out of quota.',
        solution: 'A Spring Boot backend that plans a job as a graph of tasks, picks a provider per task, retries and falls back automatically, and records how each provider performs — behind a React workbench with a live plan visualiser.',
        technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'React', 'TypeScript', 'Tailwind CSS'],
        builtBy: 'Shree Pranav',
        repo: 'https://github.com/Shree-Pranav-git/Regulus',
    },
    {
        id: 'tedx-sreyas',
        client: 'tedx sreyas institute',
        title: 'ideas worth spreading',
        kind: 'client project',
        category: 'Web Experiences',
        categorySlug: 'web',
        badgeClass: 'badge-maroon',
        image: '/assets/Work/tedx-sreyas.webp',
        imageFit: 'contain',
        coverBg: '#161616',
        subtitle: 'The official TEDx Sreyas Institute site — speakers, schedule, seat booking and payment.',
        summary: 'The full event website for TEDx Sreyas Institute: an animated landing experience, speaker and team pages, the schedule and gallery, plus seat booking with UPI QR payment and an organiser admin panel.',
        deliverables: ['Event Website', 'Seat Booking', 'UPI Payments', 'Admin Panel'],
        highlight: 'Booking + UPI checkout',
        highlights: [
            'Speakers, schedule, team and gallery pages',
            'Seat booking flow with UPI QR payment',
            'Organiser login and admin panel on Firebase',
            'Scroll-driven motion with GSAP and Lenis',
        ],
        year: '2026',
        challenge: 'An event site has to sell the day and take the bookings — attendees need to register and pay in a minute, and organisers need to see who is coming without a spreadsheet.',
        solution: 'A hand-built, animation-led site backed by Firebase: bookings and payments land in Firestore and organisers manage them from a protected admin panel.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Lenis', 'Firebase'],
        builtBy: 'Rohan Kumar & Shree Pranav',
        repo: 'https://github.com/RohanKumarSamala/TEDxSreyas-Institute',
    },
    {
        id: 'karshakmitra',
        client: 'karshakmitra',
        title: 'ai crop doctor',
        kind: 'in-house product',
        category: 'AI & Automation',
        categorySlug: 'ai',
        badgeClass: 'badge-green',
        image: '/assets/Work/karshakmitra.webp',
        imageFit: 'contain',
        coverBg: '#ffffff',
        subtitle: 'Photograph a leaf, get the disease, the cause and the treatment — in your language.',
        summary: 'KarshakMitra is a smart-farming companion. A farmer scans a crop leaf with the phone camera and an image model identifies the condition, then explains prevention and treatment in English, Hindi or Telugu.',
        deliverables: ['Disease Detection', 'Camera Scanner', 'Multilingual', 'Scan History'],
        highlight: '38 crop conditions',
        highlights: [
            'Image model trained to recognise 38 crop conditions',
            'Live camera scan or upload from the gallery',
            'Advice in English, Hindi and Telugu',
            'Mobile-first interface with recent scan history',
        ],
        year: '2026',
        challenge: 'By the time a farmer gets expert eyes on a diseased crop, it has often already spread — and most tools assume English and a desktop.',
        solution: 'A mobile-first web app with a Flask backend serving a deep-learning classifier, returning a diagnosis with plain-language prevention and treatment steps in three languages.',
        technologies: ['Python', 'Flask', 'TensorFlow / Keras', 'JavaScript'],
        builtBy: 'Rohan Kumar',
        repo: 'https://github.com/RohanKumarSamala/KarshakMitra',
    },
    {
        id: 'whatsapp-city',
        client: 'whatsapp city',
        title: 'your chats, as a city',
        kind: 'in-house product',
        category: 'Apps & Tools',
        categorySlug: 'apps',
        badgeClass: 'badge-darkblue',
        image: '/assets/Work/whatsapp-city.webp',
        imageFit: 'contain',
        coverBg: '#161616',
        subtitle: 'A Wrapped-style visualiser that turns exported WhatsApp chats into a living city.',
        summary: 'Drop in up to five WhatsApp chat exports and WhatsApp City builds a skyline from them — districts for messages, media, calls, emojis and links — alongside top senders, busiest hours and monthly activity.',
        deliverables: ['Chat Parser', 'Data Visualisation', '3D City', 'Analytics'],
        highlight: 'Runs fully in-browser',
        highlights: [
            'Parses up to 5 chat exports at once',
            'Counts messages, media, links, emojis, questions and call time',
            'Top senders, busiest hour and day, monthly activity',
            'Everything is processed in the browser — chats are never uploaded',
        ],
        year: '2026',
        challenge: 'Years of group chats hold a story, but a raw export is an unreadable text file — and nobody wants to upload private conversations to a server.',
        solution: 'A zero-backend web app that parses the export locally and renders the numbers as a playful, explorable city.',
        technologies: ['JavaScript', 'Three.js', 'HTML', 'CSS'],
        builtBy: 'Shree Pranav',
        repo: 'https://github.com/Shree-Pranav-git/Whatsapp-city',
    },
    {
        id: 'porsche-911',
        client: 'porsche 911',
        title: 'the eternal silhouette',
        kind: 'concept build',
        category: 'Web Experiences',
        categorySlug: 'web',
        badgeClass: 'badge-lightgreen',
        image: '/assets/Work/porsche-911.webp',
        imageFit: 'cover',
        coverBg: '#0b0e11',
        subtitle: 'A cinematic, scroll-driven campaign microsite with a live car configurator.',
        summary: 'A self-initiated concept: a launch-style microsite for the Porsche 911 that moves from film-led hero through design, performance and interior chapters into a configurator with a running price. Not affiliated with Porsche.',
        deliverables: ['Campaign Microsite', 'Configurator', 'Scroll Storytelling', 'Motion Design'],
        highlight: 'Live configurator',
        highlights: [
            'Scroll-driven chapters over full-screen video',
            'Configurator for wheels and aero with a live total',
            'Engine audio and motion details throughout',
            'Concept project — not affiliated with Porsche',
        ],
        year: '2026',
        challenge: 'Show how a premium product launch can feel on the web — closer to a film than a brochure — without losing the path to "configure and reserve".',
        solution: 'A React single-page experience that ties video, type and motion to scroll position and ends in an interactive configurator.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Vite'],
        builtBy: 'Shree Pranav',
        repo: 'https://github.com/Shree-Pranav-git/Porche-911',
    },
    {
        id: 'smartqueue',
        client: 'smartqueue',
        title: 'skip the waiting room',
        kind: 'in-house product',
        category: 'Apps & Tools',
        categorySlug: 'apps',
        badgeClass: 'badge-pink',
        imageFit: 'type',
        coverBg: '#161616',
        coverInk: '#f0ebe6',
        subtitle: 'Appointment booking and live queue tracking for clinics, salons and service desks.',
        summary: 'SmartQueue lets customers book a slot, get a token and watch their place in the queue move in real time, while staff run the day from an admin dashboard.',
        deliverables: ['Booking System', 'Live Queue', 'Admin Dashboard', 'REST API'],
        highlight: 'Live token tracking',
        highlights: [
            'Book an appointment and receive a queue token',
            'Check token status and the current queue live',
            'Priority (VIP) bookings',
            'Admin dashboard to manage and monitor the queue',
        ],
        year: '2026',
        challenge: 'Walk-in businesses lose customers to long, unpredictable waits, and staff lose time answering "how much longer?".',
        solution: 'A Java servlet REST API on PostgreSQL with a lightweight web front end and admin panel, packaged in Docker for one-step deployment.',
        technologies: ['Java', 'Servlets', 'JDBC', 'PostgreSQL', 'Docker'],
        builtBy: 'Shree Pranav',
        repo: 'https://github.com/Shree-Pranav-git/New-SmartQueueManagement',
    },
    {
        id: 'earth-credits',
        client: 'earth credits',
        title: 'carbon credit marketplace',
        kind: 'client project',
        category: 'Web Experiences',
        categorySlug: 'web',
        badgeClass: 'badge-green',
        imageFit: 'type',
        coverBg: '#e2dad0',
        coverInk: '#161616',
        subtitle: 'A marketplace site for browsing carbon-offset projects and buying credits.',
        summary: 'The EarthCredits web platform: a company site with a project catalogue, filters, detailed project pages and a sign-in and purchase flow for carbon credits.',
        deliverables: ['Company Website', 'Marketplace', 'Project Catalogue', 'Auth & Checkout'],
        highlight: 'Marketplace + checkout',
        highlights: [
            'Browse and filter carbon-offset projects',
            'Detailed project pages',
            'Sign-in and credit purchase flow',
            'Responsive component-based UI',
        ],
        year: '2026',
        challenge: 'Carbon credits are hard to explain and harder to trust — buyers need to see exactly which project their money supports.',
        solution: 'A clean, component-driven React site that leads with the projects themselves and keeps the path from browsing to purchase short.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Vite'],
        builtBy: 'Rohan Kumar',
        repo: 'https://github.com/RohanKumarSamala/Earth-Credits-Website',
    },
];

// ─── Companies We Worked With (Partners) ─────────────────────────────────────
export const COMPANIES_WE_WORKED_WITH = [
    {
        id: 'rajsaaga-ecommerce',
        client: 'rajsaaga',
        title: 'luxury digital store',
        category: 'Partner',
        categorySlug: 'partner',
        badgeColor: 'lightblue',
        badgeClass: 'badge-lightblue',
        type: 'partner',
        image: '/assets/Work/rajsaaga.webp',
        imageFit: 'contain',
        coverBg: '#e2dad0',
        subtitle: 'High-converting custom e-commerce web platform.',
        summary: 'An ultra-fast Next.js e-commerce application crafted in strategic partnership with Rajsaaga, featuring silky smooth page transitions, dynamic product customizers, and frictionless checkout.',
        deliverables: ['Strategic Partner', 'Next.js App', 'Custom E-Commerce', 'UI/UX Design'],
        impact: '3.2x Conversion Rate',
        year: '2025',
        featured: true,
        bgAccent: 'var(--color-darkblue)',
        textColor: '#ffffff',
        challenge: 'Delivering a luxury offline boutique feel in an instant-loading web application.',
        solution: 'Headless storefront architecture with micro-animations and intuitive layout filtering.',
        technologies: ['Next.js', 'Tailwind CSS', 'Stripe API', 'GSAP']
    },
    {
        id: 'frufresh-brand',
        client: 'frufresh',
        title: 'fresh fruit identity',
        category: 'Partner',
        categorySlug: 'partner',
        badgeColor: 'green',
        badgeClass: 'badge-green',
        type: 'partner',
        image: '/assets/Work/frufresh.webp',
        imageFit: 'contain',
        coverBg: '#fcf8f0',
        subtitle: 'Digital brand presence for a premium fruit company.',
        summary: 'Built a vibrant digital identity and online ordering platform for Frufresh, bringing their farm-fresh produce brand to life with bold visuals and seamless e-commerce.',
        deliverables: ['Brand Identity', 'Web Platform', 'E-Commerce', 'Digital Marketing'],
        impact: '2.5x Online Orders',
        year: '2025',
        featured: true,
        bgAccent: 'var(--color-green)',
        textColor: '#ffffff',
        challenge: 'Translating fresh, organic brand values into a compelling digital storefront.',
        solution: 'Colorful, appetite-driven UI with farm-to-table storytelling and instant checkout flow.',
        technologies: ['Next.js', 'Shopify API', 'GSAP', 'Figma']
    },
    {
        id: 'raaha-retreat',
        client: 'raaha retreat',
        title: 'luxury staycation hub',
        category: 'Partner',
        categorySlug: 'partner',
        badgeColor: 'lightblue',
        badgeClass: 'badge-lightblue',
        type: 'partner',
        image: '/assets/Work/raaha-retreat.webp',
        imageFit: 'contain',
        coverBg: '#ffffff',
        subtitle: 'Immersive booking experience for a boutique retreat.',
        summary: 'Designed and developed an elegant web experience for Raaha Retreat, featuring immersive visuals, real-time availability, and a frictionless booking flow for their luxury staycation properties.',
        deliverables: ['Booking Platform', 'UI/UX Design', 'CMS Integration', 'SEO Optimization'],
        impact: '4.8★ Guest Rating',
        year: '2025',
        featured: true,
        bgAccent: 'var(--color-lightblue)',
        textColor: '#ffffff',
        challenge: 'Capturing the serene, premium retreat experience in a digital booking journey.',
        solution: 'Cinematic hero imagery with smooth scroll storytelling and integrated calendar booking.',
        technologies: ['Next.js', 'Sanity CMS', 'Stripe API', 'Lenis Scroll']
    },
    {
        id: 'restnrevel-bedding',
        client: 'restnrevel',
        title: 'luxury sleep systems',
        category: 'Partner',
        categorySlug: 'partner',
        badgeColor: 'orange',
        badgeClass: 'badge-orange',
        type: 'partner',
        image: '/assets/Work/restnrevel.webp',
        imageFit: 'contain',
        coverBg: '#fbf7ec',
        subtitle: 'Digital storefront & experience for a premium bed company.',
        summary: 'Engineered a high-performance e-commerce experience and digital brand identity for RestnRevel, showcasing their ergonomic beds, luxury mattresses, and sleep wellness collections with seamless digital shopping.',
        deliverables: ['E-Commerce Platform', 'UI/UX Design', 'Product Configurator', 'Brand Identity'],
        impact: '3.4x Sales Growth',
        year: '2025',
        featured: true,
        bgAccent: 'var(--color-orange)',
        textColor: '#ffffff',
        challenge: 'Translating the physical comfort and craftsmanship of luxury sleep systems into an engaging digital shopping journey.',
        solution: 'Interactive mattress selector, rich material storytelling, and streamlined checkout for effortless purchasing.',
        technologies: ['Next.js', 'Shopify Plus', 'GSAP', 'Tailwind CSS']
    }
];

export const PROJECTS_DATA = [...OUR_WORKS, ...COMPANIES_WE_WORKED_WITH];

export const CLIENT_REVIEWS = [
    {
        quote: "Arclume transformed our e-commerce platform with incredible speed and high conversion UI design.",
        author: "Founder",
        company: "Rajsaaga Luxury",
        rating: 5
    },
    {
        quote: "The AI workflow automation platform built by Arclume saved our ops team over 40 hours every week. Pure magic!",
        author: "Head of Technology",
        company: "Regulus Tech",
        rating: 5
    },
    {
        quote: "Our TEDx event portal handled thousands of live viewers flawlessly. Seamless execution!",
        author: "Lead Organizer",
        company: "TEDx Sreyas Institute",
        rating: 5
    }
];

// ─── Wiggle Intensity Config ────────────────────────────────────────────────
export const WIGGLE_CONFIG = {
    logoTruus: 4,
    socials: 5,
    jobHeading: 1,
    googleMap: 1,
    email: 1,
    whatsapp: 1,
};

// ─── Animation Configurations ─────────────────────────────────────────────
export const ANIMATION_CONFIG = {
    transitionScribble: {
        strokeWidthStart: "8%",
        strokeWidthMax: "31%",
        scale: 0.7,
        durationIn: 2.2,
        durationOut: 2.7
    }
};

