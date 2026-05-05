import React, { useState, useEffect } from "react";

function Carrito({ productos, busqueda, mostrarCarrito, setTotalItems }) {
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [filtroPrecio, setFiltroPrecio] = useState(0);
  const [paso, setPaso] = useState(1);

  // LOCAL STORAGE
  useEffect(() => {
    const data = localStorage.getItem("carrito");
    const fav = localStorage.getItem("favoritos");

    if (data) setCarrito(JSON.parse(data));
    if (fav) setFavoritos(JSON.parse(fav));
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    setTotalItems(total);
  }, [carrito, favoritos]);

  // FUNCIONES
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);

    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const aumentar = (id) => {
    setCarrito(
      carrito.map((item) =>
        item.id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const disminuir = (id) => {
    setCarrito(
      carrito
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminar = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const toggleFavorito = (prod) => {
    const existe = favoritos.find((f) => f.id === prod.id);

    if (existe) {
      setFavoritos(favoritos.filter((f) => f.id !== prod.id));
    } else {
      setFavoritos([...favoritos, prod]);
    }
  };

 const finalizarCompra = () => {
  if (carrito.length === 0) {
    alert("Agregá productos al carrito antes de comprar");
    return;
  }

  alert("Compra realizada 🚀");
  setCarrito([]);
  setPaso(1);
};

  // FILTROS
  const productosFiltrados = productos
    .filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
    .filter((p) => p.precio >= filtroPrecio);

  // TOTALES
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const envio = total > 299 ? 0 : 50;
  const totalFinal = total + envio;

  return (
    <div style={styles.container}>
      {/* FILTRO PRECIO */}
      <div style={styles.filtroContainer}>
  <label style={styles.filtroLabel}>
    Filtrar por precio mínimo:
  </label> 

  <input
    type="number"
    placeholder="Ej: 100"
    value={filtroPrecio}
    onChange={(e) => setFiltroPrecio(Number(e.target.value))}
    style={styles.filtro}
  />
</div>

      {/* PRODUCTOS */}
      <div style={styles.grid}>
        {productosFiltrados.map((prod) => (
          <div key={prod.id} style={styles.card}>
            <h3>{prod.nombre}</h3>
            <p>${prod.precio}</p>

            <button onClick={() => agregarAlCarrito(prod)}>
              Agregar
            </button>

            <button onClick={() => toggleFavorito(prod)}>
              {favoritos.find((f) => f.id === prod.id) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>

      {/* CARRITO */}
      {mostrarCarrito && (
        <div style={styles.carrito}>
          <h2>Tu carrito</h2>

          {carrito.map((item) => (
            <div key={item.id} style={styles.item}>
              <div>
                <strong>{item.nombre}</strong>
                <p>Subtotal: ${item.precio * item.cantidad}</p>

                <div>
                  <button onClick={() => disminuir(item.id)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => aumentar(item.id)}>+</button>
                </div>
              </div>

              <button onClick={() => eliminar(item.id)}>❌</button>
            </div>
          ))}

          <div>
            <p>Subtotal: ${total}</p>
            <p>Envío: {envio === 0 ? "Gratis" : `$${envio}`}</p>
            <h3>Total: ${totalFinal}</h3>
          </div>

          {paso === 1 && (
            <button onClick={() => setPaso(2)}>
              Ir a pagar
            </button>
          )}

          {paso === 2 && (
            <button onClick={finalizarCompra}
                    disabled={carrito.length === 0}
                    style={{
                       ...styles.buy,
                       background: carrito.length === 0 ? "#ccc" : "#00a650",
                       cursor: carrito.length === 0 ? "not-allowed" : "pointer",
  }}

>
              Confirmar compra
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  filtro: {
    marginBottom: "20px",
    padding: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  carrito: {
    position: "fixed",
    right: "20px",
    top: "80px",
    width: "300px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  filtroContainer: {
  marginBottom: "20px",
},

filtroLabel: {
  display: "block",
  marginBottom: "5px",
  fontWeight: "600",
  color: "#333",
},
};

export default Carrito;