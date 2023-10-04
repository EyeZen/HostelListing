import styled from "styled-components";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { selectPropertiesData } from "../store/slices/property";
import { markSaved } from "../store/slices/property";
import { useNavigate } from "react-router";

const CardsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
`;

export default function CardGroup() {
    const properties = useSelector(selectPropertiesData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cardSaveHandler = (id, saved) => {
        dispatch(markSaved({id, saved}));
    }

    const cardRentingHandler = (id) => {
        alert("Renting property "+properties.find(item => item.id === id).address);
    }

    return (
        <CardsWrapper>
            {properties?.map(({id, ...data}) => (
                <Card
                    key={id}
                    data={data}
                    onSave={(saved) => cardSaveHandler(id, saved)}
                    onRent={() => cardRentingHandler(id)}
                    onOpen={() => navigate(`/property/${id}`)}
                />
            ))}
        </CardsWrapper>
    );
}
