import { useRef, useState } from "react";
import {
  TableContainer,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Flex,
  Text,
  Avatar,
  Tag,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalDeleteEmployee from "../Modals/ModalDeleteEmployee";
import ModalEditEmployee from "../Modals/ModalEditEmployee";

const TableEmployee = ({ employees, revalidateEmployees }) => {
  const {
    isOpen: isOpenModalDeleteEmployee,
    onOpen: onOpenModalDeleteEmployee,
    onClose: onCloseModalDeleteEmployee,
  } = useDisclosure();
  const {
    isOpen: isOpenModalEditEmployee,
    onOpen: onOpenModalEditEmployee,
    onClose: onCloseModalEditEmployee,
  } = useDisclosure();

  const cancelRef = useRef();
  const [deletedEmployeeId, setDeletedEmployeeId] = useState("");
  const [editedEmployee, setEditedEmployee] = useState({});

  const handleOpenModalDeleteEmployee = (employeeId) => {
    setDeletedEmployeeId(employeeId);
    onOpenModalDeleteEmployee();
  };

  const handleCloseModalDeleteEmployee = () => {
    setDeletedEmployeeId("");
    onCloseModalDeleteEmployee();
  };

  const handleOpenModalEditEmployee = (data) => {
    setEditedEmployee(data);
    onOpenModalEditEmployee();
  };

  const handleCloseModalEditEmployee = () => {
    setEditedEmployee({});
    onCloseModalEditEmployee();
  };

  return (
    <>
      {employees.length > 0 ? (
        <TableContainer>
          <Table variant="simple" colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th>Full name</Th>
                <Th>Role</Th>
                <Th>Status</Th>
                <Th>Employed</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees?.map((employee) => (
                <Tr key={employee.id}>
                  <Td>
                    <Flex gap={3} alignItems="center">
                      <Avatar name={employee.fullName} src="#" />
                      <Text>{employee.fullName}</Text>
                    </Flex>
                  </Td>
                  <Td>{employee.role.name}</Td>
                  <Td>
                    <Tag colorScheme={employee.isActive ? "green" : "red"}>
                      {employee.isActive ? "Active" : "Inactive"}
                    </Tag>
                  </Td>
                  <Td>
                    {new Date(employee.employed).toLocaleString("id-ID", {
                      dateStyle: "short",
                    })}
                  </Td>
                  <Td>{employee.email}</Td>
                  <Td>{employee.phone}</Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="options"
                        icon={<BsThreeDotsVertical />}
                        variant="outline"
                      />
                      <MenuList>
                        <MenuItem
                          onClick={() => handleOpenModalEditEmployee(employee)}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            handleOpenModalDeleteEmployee(employee.id)
                          }
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text>Employee is empty</Text>
      )}
      <ModalDeleteEmployee
        isOpen={isOpenModalDeleteEmployee}
        cancelRef={cancelRef}
        onClose={handleCloseModalDeleteEmployee}
        employeeId={deletedEmployeeId}
        revalidateEmployees={revalidateEmployees}
      />
      <ModalEditEmployee
        data={editedEmployee}
        isOpen={isOpenModalEditEmployee}
        onClose={handleCloseModalEditEmployee}
        revalidateEmployees={revalidateEmployees}
      />
    </>
  );
};

export default TableEmployee;
