export default function Toast({ show, message }) {
  return (
    <div className={`toast ${show ? "toast-show" : "toast-hide"}`}>{message}</div>
  );
};