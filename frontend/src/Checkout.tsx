import { useParams } from "react-router-dom";

function Checkout() {
    const { title } = useParams<{ title: string }>();
  return (
    <>
        <div className="row">
            <h1>Amaze Books!</h1>
        </div>
        <div className="container">
            <h2>You sure you want to checkout <b>{title}</b>?</h2>
        </div>
      
    </>
  );
}
export default Checkout;