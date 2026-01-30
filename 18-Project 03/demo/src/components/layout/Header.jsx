import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../../context/CartContext.jsx";

/**
 * Teaching note:
 * - NavLink adds an active state when the route matches.
 * - We show a cart item count in the nav to demonstrate shared state.
 */

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  border-bottom: 1px solid #eee;
`;

const Inner = styled.div`
  width: min(1100px, 100%);
  margin: 0 auto;
  padding: 0.75rem 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (min-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
  font-weight: 900;
`;

const Logo = styled.img`
  width: 36px;
  height: 36px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const navLinkStyle = ({ isActive }) => ({
  textDecoration: "none",
  fontWeight: 800,
  color: isActive ? "#e63946" : "#222",
});

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.4rem;
  border-radius: 999px;
  background: #222;
  color: white;
  font-size: 0.75rem;
  margin-left: 0.4rem;
`;

export default function Header() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <Bar>
      <Inner>
        <Brand to="/">
          <Logo src="/images/logo.png" alt="Moonlight Pizza Co. logo" />
          Moonlight Pizza Co.
        </Brand>

        <Nav aria-label="Main navigation">
          <NavLink to="/menu" style={navLinkStyle}>Menu</NavLink>
          <NavLink to="/specials" style={navLinkStyle}>Specials</NavLink>
          <NavLink to="/order" style={navLinkStyle}>
            Order{count > 0 ? <Badge aria-label={`Cart items: ${count}`}>{count}</Badge> : null}
          </NavLink>
          <NavLink to="/contact" style={navLinkStyle}>Contact</NavLink>
          <NavLink to="/about" style={navLinkStyle}>About</NavLink>
        </Nav>
      </Inner>
    </Bar>
  );
}
