import axios from "axios";
import React, { useEffect, useState } from "react";

const continents = [
  { name: "AFRICA", color: "primary" },
  { name: "AMERICA", color: "danger" },
  { name: "ASIA", color: "secondary" },
  { name: "EUROPA", color: "success" },
  { name: "OCEANIA", color: "warning" },
];

const continentLabels = {
  AFRICA: "África",
  AMERICA: "América",
  ASIA: "Asia",
  EUROPA: "Europa",
  OCEANIA: "Oceanía",
};

export default function Lugares() {
  const urlBase = "http://localhost:8080/mapamundi-api/lugares";
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [lugares, setLugares] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [sortBy, setSortBy] = useState("ciudad"); // Estado para definir el tipo de orden
  const [totalesGlobales, setTotalesGlobales] = useState({
    totalPaises: 0,
    totalCiudades: 0,
  });

  const [nombre, setNombre] = useState("");
  const [zona, setZona] = useState("");
  const [pais, setPais] = useState("");
  const [continente, setContinente] = useState("");

  useEffect(() => {
    cargarLugares();
  }, []);

  const cargarLugares = async () => {
    try {
      const resultado = await axios.get(urlBase);
      console.log("Resultado cargar lugares:", resultado.data);
      setLugares(resultado.data);

      const totalPaises = new Set(resultado.data.map((lugar) => lugar.pais))
        .size;
      const totalCiudades = resultado.data.length;
      setTotalesGlobales({ totalPaises, totalCiudades });
    } catch (error) {
      console.error("Error al cargar los lugares:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const yaExiste = lugares.some(
      (l) => l.nombre.toLowerCase() === nombre.toLowerCase()
    );
    if (yaExiste) {
      alert("Ya existe una ciudad con ese nombre");
      return;
    }

    const nuevoLugar = { nombre, zona, pais, continente };
    try {
      await axios.post(urlBase, nuevoLugar);
      await cargarLugares();
      setNombre("");
      setZona("");
      setPais("");
      setContinente("");
    } catch (error) {
      console.error("Error al guardar el lugar:", error);
      alert("Hubo un error al guardar el lugar");
    }
  };

  // Función para filtrar lugares por continente o por país
  const filtrarLugares = () => {
    if (selectedCountry) {
      return ordenarCiudades(
        lugares.filter((lugar) => lugar.pais === selectedCountry)
      );
    } else if (selectedContinent) {
      return ordenarCiudades(
        lugares.filter((lugar) => lugar.continente === selectedContinent)
      );
    }
    return [];
  };

  // Función para ordenar ciudades por ciudad o por zona
  const ordenarCiudades = (ciudades) => {
    return ciudades.sort((a, b) => {
      if (sortBy === "ciudad") {
        return a.nombre.localeCompare(b.nombre); // Ordenar por ciudad
      } else {
        return a.zona.localeCompare(b.zona); // Ordenar por región
      }
    });
  };

  // Resetear el país seleccionado al cambiar de continente
  const seleccionarContinente = (continente) => {
    setSelectedContinent(continente);
    setSelectedCountry(null); // Limpiar país seleccionado
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ marginTop: "30px" }}>
        <h3>Lugares que he visitado en el mundo</h3>
        <p>
          Total de países: {totalesGlobales.totalPaises}, Total de ciudades:{" "}
          {totalesGlobales.totalCiudades}
        </p>
      </div>
      <div className="container mt-4">
        <ul className="nav nav-tabs">
          {continents.map((continent, index) => (
            <li className="nav-item" key={index}>
              <button
                className={`nav-link ${
                  selectedContinent === continent.name ? "active" : ""
                }`}
                style={{
                  backgroundColor:
                    selectedContinent === continent.name ? continent.color : "",
                }}
                onClick={() => seleccionarContinente(continent.name)}
              >
                {continentLabels[continent.name]}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-3">
          {selectedContinent && (
            <div>
              {selectedCountry ? (
                <>
                  <h4>Ciudades en {selectedCountry}</h4>

                  <ul className="list-group">
                    {filtrarLugares().map((lugar) => (
                      <li className="list-group-item" key={lugar.idLugar}>
                        {sortBy === "ciudad"
                          ? `${lugar.nombre} - ${lugar.zona}`
                          : `${lugar.zona} - ${lugar.nombre}`}
                      </li>
                    ))}
                  </ul>

                  <div className="form-check form-switch mt-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="sortToggle"
                      checked={sortBy === "zona"}
                      onChange={() =>
                        setSortBy(sortBy === "ciudad" ? "zona" : "ciudad")
                      }
                    />
                    <label className="form-check-label" htmlFor="sortToggle">
                      Ordenar por {sortBy === "ciudad" ? "región" : "ciudad"}
                    </label>
                  </div>

                  <button
                    className="btn btn-secondary mt-3"
                    onClick={() => setSelectedCountry(null)}
                  >
                    Regresar a {continentLabels[selectedContinent]}
                  </button>
                </>
              ) : (
                <>
                  <h4>Países en {continentLabels[selectedContinent]}</h4>
                  {filtrarLugares().length > 0 ? (
                    <ul className="list-group">
                      {filtrarLugares()
                        .map((lugar) => lugar.pais)
                        .filter(
                          (value, index, self) => self.indexOf(value) === index
                        ) // Remover duplicados
                        .map((pais, index) => (
                          <li
                            className="list-group-item"
                            key={index}
                            onClick={() => setSelectedCountry(pais)}
                          >
                            {pais}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p>
                      No hay países registrados en{" "}
                      {continentLabels[selectedContinent]}.
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          {!selectedContinent && <h4>Seleccione un continente</h4>}
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-2">
            <input
              className="form-control"
              type="text"
              placeholder="Nombre de la ciudad"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              className="form-control"
              type="text"
              placeholder="Zona / Región"
              value={zona}
              onChange={(e) => setZona(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              className="form-control"
              type="text"
              placeholder="País"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <select
              className="form-select"
              value={continente}
              onChange={(e) => setContinente(e.target.value)}
              required
            >
              <option value="">Selecciona un continente</option>
              {continents.map((c) => (
                <option key={c.name} value={c.name}>
                  {continentLabels[c.name]}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" type="submit">
            Agregar ciudad
          </button>
        </form>
      </div>
    </div>
  );
}
