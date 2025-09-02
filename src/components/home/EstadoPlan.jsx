import { useState, useEffect } from "react";
import { Card, Badge, Button, Alert } from "react-bootstrap";
import { renovarPlan, cancelarPlan } from "../../helpers/planes.helper";
import Swal from "sweetalert2";

const EstadoPlan = () => {
  const [planUsuario, setPlanUsuario] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    obtenerPlanUsuario();
  }, []);

  const obtenerPlanUsuario = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const response = await fetch(`/api/usuarios/${payload.idUsuario}`);
      const data = await response.json();
      setPlanUsuario(data.usuario);
    } catch (error) {
      console.error("Error al obtener plan:", error);
    }
  };

  const handleRenovar = async () => {
    setLoading(true);
    try {
      await renovarPlan(planUsuario._id);
      Swal.fire(
        "✅ ¡Plan renovado!",
        "Tu plan ha sido renovado exitosamente",
        "success"
      );
      obtenerPlanUsuario(); // Actualizar datos
    } catch (error) {
      Swal.fire("❌ Error", "No se pudo renovar el plan", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = async () => {
    const result = await Swal.fire({
      title: "¿Cancelar plan?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, mantener",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await cancelarPlan(planUsuario._id);
        Swal.fire("✅ Plan cancelado", "Tu plan ha sido cancelado", "success");
        obtenerPlanUsuario(); // Actualizar datos
      } catch (error) {
        Swal.fire("❌ Error", "No se pudo cancelar el plan", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  if (!planUsuario || planUsuario.plan === "Sin plan") {
    return (
      <Alert variant="warning" className="my-3">
        <h5>📋 No tienes un plan activo</h5>
        <p className="mb-2">
          Para acceder a todas las instalaciones y clases, contrata uno de
          nuestros planes.
        </p>
        <Button variant="outline-warning" size="sm">
          Ver Planes
        </Button>
      </Alert>
    );
  }

  const getPlanColor = (plan) => {
    switch (plan) {
      case "Musculación":
        return "primary";
      case "Clases":
        return "success";
      case "Full":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getPlanIcon = (plan) => {
    switch (plan) {
      case "Musculación":
        return "💪";
      case "Clases":
        return "🏃‍♀️";
      case "Full":
        return "⭐";
      default:
        return "📋";
    }
  };

  return (
    <Card className="my-3 border-0 shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">{getPlanIcon(planUsuario.plan)} Tu Plan Actual</h5>
      </Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 className="mb-1">
              Plan:{" "}
              <Badge bg={getPlanColor(planUsuario.plan)}>
                {planUsuario.plan}
              </Badge>
            </h6>
            <p className="text-muted mb-0">
              Estado: <Badge bg="success">Activo</Badge>
            </p>
          </div>
          <div className="text-end">
            <small className="text-muted d-block">Vence el</small>
            <strong>{planUsuario.fechaVencimiento || "31/12/2024"}</strong>
          </div>
        </div>

        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleRenovar}
            disabled={loading}
          >
            {loading ? "Procesando..." : "🔄 Renovar"}
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={handleCancelar}
            disabled={loading}
          >
            {loading ? "Procesando..." : "❌ Cancelar"}
          </Button>
        </div>

        {/* Beneficios del plan */}
        <div className="mt-3">
          <h6>Beneficios incluidos:</h6>
          <ul className="list-unstyled">
            {planUsuario.plan === "Musculación" && (
              <>
                <li>✅ Acceso a área de musculación</li>
                <li>✅ Máquinas y pesas libres</li>
                <li>✅ Vestuarios y duchas</li>
              </>
            )}
            {planUsuario.plan === "Clases" && (
              <>
                <li>✅ Todas las clases grupales</li>
                <li>✅ Spinning, funcional, zumba</li>
                <li>✅ Vestuarios y duchas</li>
              </>
            )}
            {planUsuario.plan === "Full" && (
              <>
                <li>✅ Acceso completo a todas las instalaciones</li>
                <li>✅ Todas las clases grupales</li>
                <li>✅ Área de musculación</li>
                <li>✅ Vestuarios y duchas</li>
                <li>✅ Asesoramiento personalizado</li>
              </>
            )}
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EstadoPlan;
