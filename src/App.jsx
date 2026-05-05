import { useState } from "react";
import Carrito from "./components/Facultad/Carrito";

function App() {
  const [productos] = useState([
    { id: 1, nombre: "Casco Fox V3", precio: 300 },
    { id: 2, nombre: "Guantes Fox 180", precio: 40 },
    { id: 3, nombre: "Botas Alpinestars Tech10", precio: 499 },
    { id: 4, nombre: "Campera Moto", precio: 599 },
    { id: 5, nombre: "Cubierta 110/90-19", precio: 99 },
    { id: 6, nombre: "Cubierta 80/100-21", precio: 99 },
    { id: 7, nombre: "Manubrio Renthal TwinWall", precio: 199 },
    { id: 8, nombre: "Escape Yoshimura Rs12", precio: 1400 },
    { id: 9, nombre: "Palanca de cambios CRF", precio: 60 },
    { id: 10, nombre: "Manoplas ODI", precio: 30 },
    { id: 11, nombre: "Cadena 520 D.I.D. Gold", precio: 130 },
    { id: 12, nombre: "Corona 50T REnthal", precio: 90 },
    { id: 13, nombre: "Kit de Piston KXF250", precio: 299 },
    { id: 14, nombre: "Kit de biela KXF250 21'- 24'", precio: 399 },
    { id: 15, nombre: "Cubre Manos Acerbis", precio: 149 },
    { id: 16, nombre: "Motor Pro Circuit YZF250", precio: 5000 },
    { id: 17, nombre: "Suspencion Showa 50mm CRF250", precio: 3000 },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h2>🛒 Fosi MotoShop</h2>

        <input
          style={styles.search}
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <div
          style={styles.cartIcon}
          onClick={() => setMostrarCarrito(!mostrarCarrito)}
        >
          🛒 ({totalItems})
        </div>
      </header>

      <Carrito
        productos={productos}
        busqueda={busqueda}
        mostrarCarrito={mostrarCarrito}
        setTotalItems={setTotalItems}
      />
    </div>
  );
}

const styles = {
  app: {
    background: "#f5f5f5",
    minHeight: "100vh",
    fontFamily: "Arial",
  },
  header: {
    background: "#3483fa",
    color: "white",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  search: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    width: "40%",
  },
  cartIcon: {
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default App;