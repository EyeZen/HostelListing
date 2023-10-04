import styled from "styled-components";
import Button, { ButtonSolid } from "../components/common/Button";
import CardGroup from "../components/CardGroup";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    dataLoadFailure,
    dataLoadStart,
    dataLoadSuccess,
    selectError,
    selectLoading,
    selectPropertiesData,
} from "../store/slices/property";
import Tabbar from "../components/Tabbar";
import useTab from "../hooks/useTab";

const Container = styled.div`
    background-color: ${(props) => props.theme.colors.background};
`;

const ContentWrapper = styled.div`
    min-height: 100vh;
    width: 60%;
    margin-inline: auto;
`;

// Header Styles
const Header = styled.header`
    max-width: 440px;
    margin-inline: auto;
    padding-block: 1em;

    & h1 {
        color: ${(props) => props.theme.colors.primary};
        font-size: 2.5rem;
        font-weight: bold;
    }

    & p {
        color: ${(props) => props.theme.colors.secondary};
        width: 100%;
        font-weight: bold;

        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2;
    }
`;

// Footer
const Footer = styled.footer`
    display: flex;
    justify-content: center;
    padding-block: 2em;
`;

export default function Home() {
    const dispatch = useDispatch();
    const properties = useSelector(selectPropertiesData);
    const dataLoading = useSelector(selectLoading);
    const showMoreRequestControllerRef = useRef(null);
    const [selectedCity, _] = useTab();
    const dataError = useSelector(selectError);

    // Handlers
    const showMoreBtnHandler = async () => {
        const start = properties.length;
        const end = start + 3;
        showMoreRequestControllerRef.current = new AbortController();

        try {
            dispatch(dataLoadStart());
            const res = await fetch(
                `http://localhost:3000/properties?city=${selectedCity}&_start=${start}&_end=${end}`,
                {
                    signal: showMoreRequestControllerRef.current.signal,
                }
            );
            const data = await res.json();
            dispatch(
                dataLoadSuccess({
                    properties: [...properties, ...data],
                })
            );
        } catch (err) {
            dispatch(dataLoadFailure(err.message));
        }
        showMoreRequestControllerRef.current = null;
    };

    // componentDidMount
    useEffect(() => {

        // componentWillUnmount
        return () => {
            showMoreRequestControllerRef.current?.abort();
        };
    }, []);

    return (
        <Container>
            <ContentWrapper>
                <Header>
                    <h1>Featured Listed Property</h1>
                    <p>
                        Real estate can be bought, sold, leased or rented and
                        can be a valuable investment opportunity. The value of
                        real estate can be affected by various factors such as
                        location, economic conditions, demand and supply
                        dynamics, infrastructure development, and market trends.
                        Additionally, the value of real estate can be influenced
                        by factors like property size, condition, amenities, and
                        the overall potential for future growth and development
                        in the area. Understanding these factors is crucial for
                        making informed decisions in real estate investment, as
                        they can impact both the short-term and long-term value
                        of the property.
                    </p>
                </Header>
                
                <Tabbar />

                <CardGroup />
            </ContentWrapper>

            <Footer>
                {!dataLoading && !dataError && (
                    <ButtonSolid onClick={showMoreBtnHandler}>
                        <i className="fa-solid fa-hourglass-start"></i>
                        Show More
                    </ButtonSolid>
                )}
            </Footer>
        </Container>
    );
}
