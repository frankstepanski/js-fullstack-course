import styled from "styled-components";
import Button from "../components/ui/Button.jsx";
import { Link } from "react-router-dom";

const Hero = styled.section`
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #eee;
  background: white;
  display: grid;

  @media (min-width: 900px) {
    grid-template-columns: 1.2fr 1fr;
  }
`;

const HeroImg = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;

  @media (min-width: 768px) {
    height: 320px;
  }

  @media (min-width: 900px) {
    height: 100%;
    min-height: 360px;
  }
`;

const HeroBody = styled.div`
  padding: 1rem;
  display: grid;
  gap: 0.75rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

export default function Home() {
  return (
    <Hero>
      <HeroImg src="/images/pizza-hero.jpg" alt="Pizza hero" />
      <HeroBody>
        <h1 style={{ margin: 0 }}>Moonlight Pizza Co.</h1>
        <p style={{ margin: 0, color: "#555", lineHeight: 1.5 }}>
          Welcome to the React version of the demo. This app uses React Router,
          a json-server API, and shared cart state with Context + Reducer.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link to="/menu" style={{ textDecoration: "none" }}>
            <Button>Browse Menu</Button>
          </Link>
          <Link to="/order" style={{ textDecoration: "none" }}>
            <Button variant="ghost">Go to Order</Button>
          </Link>
        </div>
      </HeroBody>
    </Hero>
  );
}
