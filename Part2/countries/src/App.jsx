import { useState, useEffect } from "react";
import countryService from "./services/country-service";
import Country from "./components/Country";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  // const [searchedCountry, setSearchedCountry] = useState([]);
  const [showCountry, setShowCountry] = useState({});

  useEffect(() => {
    countryService.getAllCountries().then((response) => {
      console.log(response.data);
      setCountries(
        response.data.map((country) => ({
          name: country.name.common,
          capital: country.capital,
          area: country.area,
          languages: country.languages,
          flags: country.flags,
          lat: country.latlng[0],
          lon: country.latlng[0],
        }))
      );
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
    setShowCountry({});
  };

  const handleShowCountry = (name) => {
    setShowCountry(
      filteredCountries.filter((country) => country.name.includes(name))[0]
    );
  };
  console.log(showCountry);

  console.log(filteredCountries);

  return (
    <>
      <div className="filter">
        Find countries
        <input type="text" value={search} onChange={handleSearch} />
      </div>
      <div className="country__info">
        {filteredCountries.length > 10 &&
          "Too many matches, specify another filter"}
        {filteredCountries.length < 10 && filteredCountries.length > 1
          ? filteredCountries.map((country) => (
              <div
                key={country.name}
                className="country"
                style={{ display: "flex", gap: 3, margin: 2 }}
              >
                {country.name}
                <button
                  onClick={() => {
                    handleShowCountry(country.name);
                  }}
                >
                  Show More
                </button>
              </div>
            ))
          : null}
        {filteredCountries.length === 1 && (
          <Country country={filteredCountries[0]} />
        )}
        {showCountry.name && <Country country={showCountry} />}
      </div>
    </>
  );
};

export default App;
