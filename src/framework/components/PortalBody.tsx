import ReactDOM from "react-dom";

const PortalBody = ({ children }: any) => {
  return ReactDOM.createPortal(children, document.body);
};

export default PortalBody;
