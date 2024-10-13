import { FC } from 'react';
import './index.css';

interface ImageOverlayProps {
    src: string;       
    onClose: () => void; 
}

const ImageOverlay: FC<ImageOverlayProps> = ({ src, onClose }) => {
    return (
        <div className="overlay" onClick={onClose}>
            <div className="overlay-content" onClick={e => e.stopPropagation()}>
                <img src={src} alt="Overlay" onClick={onClose} />
            </div>
        </div>
    );
};

export { ImageOverlay };
