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

const TableEmployee = ({ data }) => {
  const {
    isOpen: isOpenModalDeleteEmployee,
    onOpen: onOpenModalDeleteEmployee,
    onClose: onCloseModalDeleteEmployee,
  } = useDisclosure();
  const cancelRef = useRef();
  const [deletedEmployeeId, setDeletedEmployeeId] = useState("");

  const handleOpenModalDeleteEmployee = (employeeId) => {
    setDeletedEmployeeId(employeeId);
    onOpenModalDeleteEmployee();
  };

  const handleCloseModalDeleteEmployee = () => {
    setDeletedEmployeeId("");
    onCloseModalDeleteEmployee();
  };

  return (
    <>
      <TableContainer>
        <Table variant='simple' colorScheme='blackAlpha'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Employed</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((employee) => (
              <Tr key={employee.id}>
                <Td>
                  <Flex gap={3} alignItems='center'>
                    <Avatar name={employee.name} src='#' />
                    <Text>{employee.name}</Text>
                  </Flex>
                </Td>
                <Td>{employee.role}</Td>
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
                      aria-label='options'
                      icon={<BsThreeDotsVertical />}
                      variant='outline'
                    />
                    <MenuList>
                      <MenuItem>Edit</MenuItem>
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
      <ModalDeleteEmployee
        isOpen={isOpenModalDeleteEmployee}
        cancelRef={cancelRef}
        onClose={handleCloseModalDeleteEmployee}
        employeeId={deletedEmployeeId}
      />
    </>
  );
};

export default TableEmployee;
