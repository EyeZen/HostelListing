import styled from "styled-components";
import { useEffect, useState } from "react";
import Button, { ButtonSolid } from "./common/Button";
import ImageCarousel from "./common/ImageCarousel";
import Facilities from "./common/Facilities";
import property from "../store/slices/property";

// Card Styles
const CardContainer = styled.div`
    width: 100%;
    max-height: 610px;
    position: relative;
`;
const CardWrapper = styled.div`
    width: 100%;
    height: 100%;

    border-radius: 24px;
    background-color: ${(props) => props.theme.colors.components};
    border: 1px solid white;
    box-shadow: 0 0 20px ${(props) => props.theme.colors.shadow};
    overflow: hidden;
    padding: 5px;
    cursor: pointer;
`;

export const CarouselButton = styled(ButtonSolid)`
    border: none;
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.accent};
    position: absolute;
    top: 10px;
    &.rent-btn {
        padding: 0.8em 1.2em;
        left: 10px;
    }
    &.save-btn {
        right: 10px;
        border-radius: 50%;
        padding: 0.8em;
    }
`;

// Card Content
const CardContent = styled.div`
    padding: 1.5em;
`;

const LocationWrapper = styled.div`
    color: ${(props) => props.theme.colors.secondary};
    margin-block: 0.5em;
    & > i {
        color: ${(props) => props.theme.colors.iconAccent};
        margin-right: 0.5em;
    }
`;

const Address = styled.h1`
    font-size: 1.3rem;
    color: ${(props) => props.theme.colors.heading};
`;

// Facilities Styles
const FacilitiesWrapper = styled.ul`
    list-style: none;
    padding-block: 1.5em;
    display: flex;

    padding-inline: 0;
    border-bottom: 1px dashed ${(props) => props.theme.colors.divider};
`;

const Facility = styled.li`
    flex: 1;
    display: flex;
    white-space: nowrap;
    color: ${(props) => props.theme.colors.icon};
    
    flex-direction: column;
    gap: 0.5em;
    padding-inline: 0.8em;

    &:not(:last-child) {
        border-right: 1px dashed ${(props) => props.theme.colors.divider};
    }
`;

// Buttons
const CardOptions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5em;
`;

const RentWrapper = styled.span`
    font-size: 0.8em;
    color: ${(props) => props.theme.colors.heading};

    & span {
        font-size: 1.2rem;
        font-weight: bold;
        color: ${(props) => props.theme.colors.accent};
    }
`;

// Tag
const Tag = styled.div`
    background-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.textAccent};
    padding: 0.5em 2em;
    border-radius: 5px;
    border-bottom-left-radius: 0px;
    top: 43%;
    left: -5px;

    &::before {
        content: "";
        display: inline-block;
        width: 5px;
        height: 5px;
        background-color: ${(props) => props.theme.colors.accentDark};
        border-bottom-left-radius: 10px;

        position: absolute;
        left: 0px;
        top: 100%;
    }

    position: absolute;
`;

export default function Card({ data, onSave, onRent, onOpen }) {
    const [isSaved, setSaved] = useState(data.saved ?? false);

    const cardOpenHandler = () => {
        onOpen();
    };

    const saveBtnHandler = () => {
        setSaved((saved) => !saved);
    };

    useEffect(() => {
        if (isSaved !== data.saved) {
            onSave(isSaved);
        }
    }, [isSaved]);

    return (
        <CardContainer>
            <CardWrapper>
                <ImageCarousel imgList={data.imgList}>
                    <CarouselButton className="rent-btn" onClick={onRent}>
                        For Rent
                    </CarouselButton>
                    <CarouselButton
                        className="save-btn"
                        onClick={saveBtnHandler}
                    >
                        {isSaved ? (
                            <i className="fa-solid fa-heart"></i>
                        ) : (
                            <i className="fa-regular fa-heart"></i>
                        )}
                    </CarouselButton>
                </ImageCarousel>
                <CardContent onClick={cardOpenHandler}>
                    {data.popular && <Tag>Popular</Tag>}
                    <LocationWrapper>
                        <i
                            className="fa-solid fa-location-dot"
                            aria-hidden="true"
                        ></i>
                        {data.location}
                    </LocationWrapper>

                    <Address>{data.address}</Address>

                    <Facilities data={data} />

                    <CardOptions>
                        <RentWrapper>
                            <span className="rent-amount">
                                <i className="fa-solid fa-dollar-sign"></i>
                                {data.rent_price}
                            </span>{" "}
                            / month
                        </RentWrapper>

                        <Button>Read More</Button>
                    </CardOptions>
                </CardContent>
            </CardWrapper>
        </CardContainer>
    );
}
