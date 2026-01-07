import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate(); // ✅ inside component

  return (
    <div>
      <h1>MyFRS: A Food Recommendation System</h1>
      <p>A web application to help you decide your consumption based on your health condition</p>
      <button onClick={() => navigate("/register")}>Get Started</button>
    </div>
  );
}
