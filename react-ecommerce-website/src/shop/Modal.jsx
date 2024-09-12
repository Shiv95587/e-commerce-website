export default function Modal({ setError }) {
  return (
    <div
      className="modal fade show d-block "
      tabIndex="-1"
      aria-labelledby="errorModalLabel"
      aria-hidden="true"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div
            className="modal-header text-white"
            style={{ backgroundColor: "#f16126", color: "white" }}
          >
            <h5
              className="modal-title"
              id="errorModalLabel"
              style={{ color: "white" }}
            >
              {/* Error */}
              Error Occurred.
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setError(0)}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Insufficient Quantity, Please choose a lesser number</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setError(0)}
              style={{
                color: "black",
                backgroundColor: "white",
                border: "none",
                fontWeight: "550",
                borderRadius: "0px",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
