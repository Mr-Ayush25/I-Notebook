const Alert = ({ alert }) => {
  return (
    <>
      {alert && (
        <div style={{ height: "50px" }}>
          <div
            className={`alert alert-${alert.type} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{alert.type === "danger" ? "Error" : alert.type}: </strong>
            {alert.msg}
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
