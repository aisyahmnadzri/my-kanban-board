export default function InputPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Food Input</h2>
      <p style={{ marginBottom: "1rem" }}>
        Enter a food item to check if it suits your health condition
      </p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="e.g., Fried Chicken"
          style={{ padding: "0.6rem", width: "250px" }}
        />
        <button
          style={{
            backgroundColor: "#2ecc71",
            color: "white",
            padding: "0.6rem 1rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Check
        </button>
      </div>
    </div>
  );
}
