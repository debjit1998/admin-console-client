import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function LoadingToRedirect() {
  const [count, setCount] = useState(15);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && history.push("/");

    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="container p-5 text-center">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
}

export default LoadingToRedirect;
