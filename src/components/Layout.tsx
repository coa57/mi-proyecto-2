import { Link, NavLink, useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  const user = authRepository.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
  authRepository.logout();
  navigate("/", { replace: true });
};
  const links = user?.role === "ADMIN" ? [["/admin", "Panel"], ["/admin/users", "Usuarios"], ["/admin/rooms", "Habitaciones"], ["/admin/reservations", "Reservas"], ["/admin/services", "Servicios"]] : user ? [["/", "Inicio"], ["/rooms", "Habitaciones"], ["/reservation", "Reservar"], ["/my-reservations", "Mis reservas"]] : [["/", "Inicio"], ["/rooms", "Habitaciones"], ["/services", "Servicios"]];
  return (
  <>
<header className="nav">
  <Link className="brand" to="/">
    <span>Casa Aurora</span>
    <small>HOSPEDAJE</small>
  </Link>

  <nav>
    {links.map(([to, label]) => (
      <NavLink key={to} to={to}>
        {label}
      </NavLink>
    ))}
  </nav>

  <div className="nav-actions">
    {user ? (
      <>
        <span className="user-chip">
          {user.role === "ADMIN" ? "Administrador" : user.name}
        </span>

        <button className="text-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </>
    ) : (
      <Link className="button small" to="/login">
        Iniciar sesión
      </Link>
    )}
  </div>
</header>

    {children}
  </>
);


}
