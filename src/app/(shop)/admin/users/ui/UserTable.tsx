"use client";

import { changeUserRole } from "@/actions";
import { User } from "@/interfaces";
import { FC, useState } from "react";

interface UserTableProps {
  users: User[];
}

const UserTable: FC<UserTableProps> = ({ users }) => {
  const [success, setSuccess] = useState<string>("");

  const updateRole = async (id: string, role: string) => {
    const res = await changeUserRole(id, role);

    if (res.success) {
      setSuccess(res.success);
      setTimeout(() => {
        setSuccess("");
      }, 1500);
    }
  };

  return (
    <>
      {success.length > 0 && (
        <>
          <div className="absolute p-6 rounded-lg my-6 mx-6 bg-opacity-70 bg-green-500 text-white font-bold text-xl top-10 right-10">
            <p>{success}</p>
          </div>
        </>
      )}

      <table className="min-w-full ">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Email
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Nombre completo
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Rol
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              key={user.id}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.email}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.name}
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <select
                  className="text-smm text-gray-900 p-2"
                  defaultValue={user.role}
                  onChange={async (e) =>
                    await updateRole(user.id, e.target.value)
                  }
                >
                  <option
                    value=""
                    disabled
                  >
                    --Selecciona rol--
                  </option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
