import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { selectPropertiesData } from "../store/slices/property";
import styled from "styled-components";
import Button, { ButtonSolid } from "./common/Button";
import ImageCarousel from "./common/ImageCarousel";
import Facilities from "./common/Facilities";

const Container = styled.div`
    background-color: ${(props) => props.theme.colors.background};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
`;

const ContentWrapper = styled.div`
    width: 80%;
    margin-inline: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Header = styled.header`
    font-size: 2rem;
    color: ${(props) => props.theme.colors.primary};
    padding-block: 1em;
    text-align: center;
`;

const DescriptionWrapper = styled.div`
    display: flex;
    max-width: 80%;
    margin-inline: auto;
    margin-block: 2em;
    background-color: ${(props) => props.theme.colors.white};
    padding: 5em;
    border-radius: 20px;
`;

const PropertyDescription = styled.p`
    text-align: justify;
`;

// Buttons
const RentWrapper = styled.span`
    display: block;
    text-align: center;
    padding: 1em;
    color: ${(props) => props.theme.colors.heading};

    & span {
        font-size: 1.8rem;
        font-weight: bold;
        color: ${(props) => props.theme.colors.accent};
    }
`;

const PropertyDescriptionWrapper = styled.div`
    max-width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-block: 1em;
`;

export default function Property() {
    const { id } = useParams();
    const property = useSelector(selectPropertiesData).find(
        (item) => item.id === id
    );
    const navigate = useNavigate();
    
    const backBtnHandler = () => {
        navigate("/");
    }

    const buyBtnHandler = () => {
        alert(`${property.address} bought for $${property.rent_price} only/-`)
    }

    return (
        <Container>
            <Button onClick={backBtnHandler}>
                <i className="fa fa-arrow-left" aria-hidden="true"></i>Back
            </Button>
            <ContentWrapper>
                <Header>
                    {property.address}
                </Header>

                <DescriptionWrapper>
                    <ImageCarousel imgList={property.imgList} style={{
                        height: "300px"
                    }} />

                    <Facilities data={property} vertical />

                    <PropertyDescriptionWrapper>
                        <div>
                            <RentWrapper>
                                <span className="rent-amount">
                                    <i className="fa-solid fa-dollar-sign"></i>
                                    {property.rent_price}
                                </span>{" "}
                                / month
                            </RentWrapper>

                            <PropertyDescription>
                                {property.description}
                            </PropertyDescription>
                        </div>

                        <ButtonSolid onClick={buyBtnHandler}>Buy</ButtonSolid>
                    </PropertyDescriptionWrapper>
                </DescriptionWrapper>
            </ContentWrapper>
        </Container>
    );
}
