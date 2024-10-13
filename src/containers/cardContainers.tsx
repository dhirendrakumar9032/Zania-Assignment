import React, { useEffect, useState } from "react";
import CardComponent from "../components/Card";
import {ImageOverlay} from "../components/ImageOverlay"; // Ensure it's the correct import if default export is used
import "./cardContainer.css";

export interface List {
    type: string;
    title: string;
    position: number;
    link: string;
    isLoading: boolean;
}

const CardContainers = () => {
    const [dragItem, setDragItem] = useState<number | null>(null);
    const [list, setList] = useState<List[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchCards = async () => {
            const response = await fetch('/data.json');
            const data = await response.json();
            setList(data.map((item: List) => ({ ...item, isLoading: true })));
            setTimeout(() => {
                setList(data.map((item: List) => ({ ...item, isLoading: false })));
            }, 1000);
        };

        fetchCards();
    }, []);

    useEffect(() => {
        const handleEscape = (event: any) => {
            if (event.key === 'Escape') {
                setSelectedImage(null);
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleDragStart = (index: number) => {
        setDragItem(index);
    };

    const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, index: number) => {
        if (dragItem === null) return;
        const newList = [...list];
        const item = newList[dragItem];
        newList.splice(dragItem, 1);
        newList.splice(index, 0, item);
        setDragItem(index);
        setList(newList);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
        setDragItem(null);
    };

    const handleCardClick = (link: string) => {
        setSelectedImage(link);
    };

    return (
        <div className="main-container">
            {selectedImage && <ImageOverlay src={selectedImage} onClose={() => setSelectedImage(null)} />}
            <ul className="list-container">
                {list.map((item, index) => (
                    <li
                        draggable
                        key={index}
                        onDragStart={() => handleDragStart(index)}
                        onDragEnter={(e) => handleDragEnter(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => handleCardClick(item.link)}
                    >
                        <CardComponent item={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CardContainers;
