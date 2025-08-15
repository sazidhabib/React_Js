const StandaloneLayout = ({ children }) => {
  return (
    <div
      className="standalone-page"
      style={{
        margin: 0,
        padding: 0,
        isolation: "isolate",
      }}
    >
      {children}
    </div>
  );
};

export default StandaloneLayout;
