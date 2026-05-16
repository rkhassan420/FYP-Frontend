const Loading = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100dvh", 
    width: "100%",
    backgroundColor: "var(--bg)", 
  };

  const imgStyle = {
    height: "clamp(80px, 15vw, 120px)", 
    width: "auto",
    maxWidth: "90%", 
    objectFit: "contain",
  };

  return (
    <div className="loading" style={containerStyle}>
      <img
        src="https://i.postimg.cc/mDWwKMYK/Animation-1746799416245.gif"
        alt="Loading...."
        style={imgStyle}
      />
    </div>
  );
};

export default Loading;