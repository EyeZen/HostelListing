import styled from "styled-components";
import useTab from "../hooks/useTab";
import Button from "./common/Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCitiesData } from "../store/slices/property";

const TabGroup = styled.div`
    display: flex;
    justify-content: space-between;
    padding-block: 2em;
    transition: all 200ms linear;

    & button {
        background-color: ${(props) => props.theme.colors.background};
    }
    &.sticky {
        position: sticky;
        top: 0;
        z-index: 10;
        border-bottom: 1px solid ${(props) => props.theme.colors.divider};
        padding-block: 1.5em;
        padding-inline: 1em;

        border-radius: 20px;
        backdrop-filter: blur(5px);
    }
`;

const TabsWrapper = styled.div`
    display: flex;
    gap: 1em;
`;

const Tab = styled.span`
    background-color: ${(props) => props.theme.colors.tab};
    color: ${(props) => props.theme.colors.secondary};
    padding: 0.8em 1.8em;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;

    &.selected {
        background-color: ${(props) => props.theme.colors.accent};
        color: ${(props) => props.theme.colors.textAccent};
    }
`;

export default function Tabbar() {
    const [isSticky, setSticky] = useState(false);
    const cities = useSelector(selectCitiesData);
    const [selectedTab, setSelectedTab] = useTab();

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 120) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };

    // componentDidMount
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        // componentWillUnmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const viewAllBtnHandler = () => {
        alert("Not Implemented");
    }

    return <TabGroup className={isSticky ? "sticky" : ""}>
    <TabsWrapper>
        {cities.map((city, idx) => (
            <Tab
                key={idx}
                className={
                    selectedTab === city ? "selected" : ""
                }
                onClick={() => setSelectedTab(city)}
            >
                {city}
            </Tab>
        ))}
    </TabsWrapper>

    <Button onClick={viewAllBtnHandler}>
        View All
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
    </Button>
</TabGroup>
}