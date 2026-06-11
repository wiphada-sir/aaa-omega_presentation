export default function StatCard({ title, value, subtext }) {

  const notFound = <span className="badge badge-soft badge-content">ไม่พบข้อมูล</span>;
  const checkData = (data) => data === undefined || data === null || data === "" ? notFound : data;

  return (
    <article className="card-stat">
      <h3 className="card-stat__title">{checkData(title)}</h3>
      <p className="card-stat__value">{checkData(value)}</p>
      <p className="card-stat__subtext">{checkData(subtext)}</p>
    </article>
  );

};