import dinamic from 'next/dynamic';

const Map = dinamic(() => import('./map'), { ssr: false });

export default Map;