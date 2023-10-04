import styled from "styled-components";
import { useEffect, useState } from "react";

export const Carousel = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    aspect-ratio: 3/2;

    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const CarouselControls = styled.ul`
    list-style: none;
    padding: 0;
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    margin-inline: auto;
    bottom: 10px;

    display: flex;
    justify-content: center;
    gap: 5px;

    & li {
        width: 6px;
        height: 6px;
        background-color: ${(props) => props.theme.colors.white};
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 200ms linear;
    }
    & li.active {
        background-color: ${(props) => props.theme.colors.iconAccent};
    }
`;

export default function ImageCarousel({ children, imgList, ...props }) {
    const [visibleIndex, setVisibleIndex] = useState(0);

    const carouselControlItems =
        imgList.length > 1
            ? imgList.map((_, idx) => (
                  <li
                      key={idx}
                      onClick={() => setVisibleIndex(idx)}
                      className={idx === visibleIndex ? "active" : ""}
                  ></li>
              ))
            : [];

    useEffect(() => {
        if (imgList.length < 2) return;
        const carouselScrollInterval = setInterval(() => {
            setVisibleIndex(
                (visibleIndex) => (visibleIndex + 1) % imgList.length
            );
        }, 5000);

        return () => clearInterval(carouselScrollInterval);
    }, []);

    return (
        <Carousel {...props} >
            <img src={imgList[visibleIndex]} />
            <CarouselControls>{carouselControlItems}</CarouselControls>
            {children}
        </Carousel>
    );
}
