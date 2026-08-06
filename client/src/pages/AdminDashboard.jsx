const AdminDashboard = () => {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2rem,5vw,3rem)",
        }}
      >
        👨‍💼 Admin Dashboard
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#666",
        }}
      >
        Welcome to the Admin Dashboard.
      </p>
    </div>
  );
};

export default AdminDashboard;