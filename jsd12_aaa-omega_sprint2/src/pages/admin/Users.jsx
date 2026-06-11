import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MessageContext } from "../../contexts/messageContext/MessageContext";
import StatCard from "../../components/admin/common/StatCard";
import { PageNotFound, DataNotFound } from "../../components/common/NotFound";
import { FormatDateTime } from "../../utils/FormatDate";

export default function AdminUsers() {

  const { users } = useContext(MessageContext);

  const navigate = useNavigate();
  const handleUserItem = (userNumber) => navigate(`./${userNumber}`);

  const latestUsers = [...users].sort((a, b) => new Date(b.lastLoginAt) - new Date(a.lastLoginAt)); /*.slice(0, 10)*/

  return (
    <>
      {users.length > 0
        ? <>
            <section id="stat">
              <StatCard title="เข้าสู่ระบบ" value="28" subtext="คน" />
              <StatCard title="พนักงานขาย" value="5" subtext="คน" />
              <StatCard title="ผู้ดูแลระบบ" value="2" subtext="คน" />
            </section>
            <section id="userMain" className="flex flex-row flex-wrap justify-between items-center gap-5">
              <h1>รายชื่อบัญชี</h1>
              <Link className="button button-soft button-primary w-full xs:w-fit" to="./create">สร้างบัญชีใหม่</Link>
              <div className="table-container">
                <table>
                  <colgroup>
                    <col className="w-auto" />
                    <col className="w-px" />
                    <col className="w-px" />
                    <col className="w-px" />
                    <col className="w-px" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>ชื่อผู้ใช้</th>
                      <th>เบอร์ติดต่อ</th>
                      <th>อีเมล</th>
                      <th>บทบาท</th>
                      <th>เข้าสู่ระบบครั้งล่าสุด</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestUsers.map((user) => (
                      <tr key={user._id}>
                        <td><button onClick={() => handleUserItem(user.userNumber)}>
                          {user.company ||
                            (user.firstName || user.lastName
                              ? `${user.firstName} ${user.lastName}`.trim()
                              : <DataNotFound />)
                          }</button>
                        </td>
                        <td className="leading-5.5 py-1.5">
                          {user.phone || user.phone2
                            ? <>
                                {user.phone}
                                {user.phone && user.phone2 && <br />}
                                {user.phone2}
                              </>
                            : <DataNotFound />
                          }
                        </td>
                        <td>{user.email || <DataNotFound />}</td>
                        <td className="capitalize">{user.role || <DataNotFound />}</td>
                        <td>{user.lastLoginAt ? FormatDateTime(user.lastLoginAt) : <DataNotFound />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        : <PageNotFound text="ไม่พบหน้าบัญชี" />
      }
    </>
  );

};