import { useEffect } from "react";

function FbComment() {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <div
      className="fb-comments"
      data-href={window.location.href}
      data-width="100%"
      data-numposts="5"
      color="white"
      style={{ width: "100%", height: "100%" }}
    ></div>
  );
}

export default FbComment;
