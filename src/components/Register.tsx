import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Later you can add form validation or save data here
    navigate("/input");
  };

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
      <h2 style={{ marginBottom: "1rem" }}>Register</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem",
          width: "300px",
        }}
      >
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="number" placeholder="Age" required />
        <input type="text" placeholder="Disease (optional)" />
        <input type="text" placeholder="Food Allergy (optional)" />
        <button
          type="submit"
          style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: "0.6rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      </form>
    </div>
  );
}

