export const PageNotFound = ({ text, icon, color }) => {
  return (
    <h2 className={`cursor-default text-center ${color || "text-content-soft"} animate-pulse py-10 md:py-15`}>
      <span className="icon-material text-9xl wght-100 animate-bounce">{icon || "error"}</span>
      <br />
      {text || "ไม่พบหน้าเว็บไซต์นี้"}</h2>
  );
};

export const DataNotFound = ({ text, icon, color }) => {
  return (
    <span className={`badge badge-soft ${color || "text-content"}`}>{icon &&
      <span className="icon-material text-9xl wght-100 animate-bounce">{icon}</span>}{text || "ไม่พบข้อมูล"}</span>
  );
};

export const TextNotFound = "ไม่พบข้อมูล";

export const ImageNotFound = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export const PageLoading = ({ text, icon, color }) => {
  return (
    <h2 className={`cursor-default text-center ${color || "text-content-soft"} animate-pulse py-10 md:py-15`}>
      <span className="icon-material text-9xl wght-100 animate-spin">{icon || "progress_activity"}</span>
      <br />
      {text || "กำลังดาวน์โหลด"}</h2>
  );
};