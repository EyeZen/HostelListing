import { useEffect, useState } from "react";
import { TabContext } from "./hooks/useTab";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { dataLoadFailure, dataLoadStart, dataLoadSuccess, selectCitiesData, selectError, selectLoading } from "./store/slices/property";
import { Route, Routes } from "react-router";
import Property from "./components/Property";
export default function App() {
    const [selectedCity, setSelectedCity] = useState(null);
    const dispatch = useDispatch();
    const cities = useSelector(selectCitiesData);
    const dataLoading = useSelector(selectLoading);
    const dataError = useSelector(selectError);

    // Load Data
    useEffect(() => {
        const start = 0;
        const end = start + 6;

        const citiesRequestController = new AbortController();
        const propertiesRequestController = new AbortController();

        const loadData = async () => {
            dispatch(dataLoadStart());

            try {
                let citiesData = cities;
                if (!citiesData.length) {
                    const citiesRes = await fetch(
                        `http://localhost:3000/cities`,
                        {
                            signal: citiesRequestController.signal,
                        }
                    );
                    citiesData = await citiesRes.json();
                }

                if (!selectedCity) {
                    dispatch(dataLoadSuccess({ cities: citiesData }));
                    setSelectedCity(citiesData[0]);
                    return;
                }

                const propertiesRes = await fetch(
                    `http://localhost:3000/properties?city=${selectedCity}&_start=${start}&_end=${end}`,
                    {
                        signal: propertiesRequestController.signal,
                    }
                );
                const propertiesData = await propertiesRes.json();

                const data = {
                    cities: citiesData,
                    properties: propertiesData,
                };

                dispatch(dataLoadSuccess(data));
            } catch (err) {
                dispatch(dataLoadFailure(err.message));
            }
        };

        if (!dataLoading) {
            loadData();

            return () => {
                citiesRequestController.abort();
                propertiesRequestController.abort();
            };
        }
    }, [selectedCity]);

    useEffect(() => {
      console.error("Data-Error:", dataError);
    }, [dataError]);

    return (
        <>
            <TabContext.Provider value={[selectedCity, setSelectedCity]}>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/property/:id" element={<Property />} />
                </Routes>
            </TabContext.Provider>
        </>
    );
}
