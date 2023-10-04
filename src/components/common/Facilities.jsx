import styled from "styled-components";

// Facilities Styles
const FacilitiesWrapper = styled.ul`
    list-style: none;
    padding-block: 1.5em;
    display: flex;
    padding-inline: 0;

    border-bottom: 1px dashed ${(props) => props.theme.colors.divider};

    &.vertical {
        flex-direction: column;
        padding-inline: 2em;
        border: none;
    }
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

    &.vertical {
        flex-direction: row;
        align-items: center;
        font-size: 1.2rem;
        gap: 1em;
        border: none;
    }
`;

export default function Facilities({ data, vertical, ...props }) {
    return (
        <FacilitiesWrapper className={vertical ? "vertical" : ""} {...props}>
            <Facility className={vertical ? "vertical" : ""}>
                <i className="fa-solid fa-building"></i>
                <span>{data.rooms} Room</span>
            </Facility>
            <Facility className={vertical ? "vertical" : ""}>
                <i className="fa-solid fa-bed"></i>
                <span>{data.bed} Bed</span>
            </Facility>
            <Facility className={vertical ? "vertical" : ""}>
                <i className="fa-solid fa-bath"></i>
                <span>{data.bath} Bath</span>
            </Facility>
            <Facility className={vertical ? "vertical" : ""}>
                <i className="fa-solid fa-arrows-up-down-left-right"></i>
                <span>{data.areaInSft} sft</span>
            </Facility>
        </FacilitiesWrapper>
    );
}
