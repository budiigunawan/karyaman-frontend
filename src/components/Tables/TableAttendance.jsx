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
  IconButton,
} from "@chakra-ui/react";
import { MdLocationPin } from "react-icons/md";
import { IoExit } from "react-icons/io5";

const TableAttendance = ({ data }) => {
  return (
    <>
      <TableContainer>
        <Table variant='simple' colorScheme='blackAlpha'>
          <Thead>
            <Tr>
              <Th>Full name</Th>
              <Th>Role</Th>
              <Th>Clock in</Th>
              <Th>Point in</Th>
              <Th>Clock out</Th>
              <Th>Point out</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((attendace) => (
              <Tr key={attendace.id}>
                <Td>
                  <Flex gap={3} alignItems='center'>
                    <Avatar name={attendace.fullName} src='#' />
                    <Text>{attendace.fullName}</Text>
                  </Flex>
                </Td>
                <Td>{attendace.role}</Td>
                <Td>{new Date(attendace.clockIn).toLocaleString("id-ID")}</Td>
                <Td>
                  {attendace.pointIn ? (
                    <IconButton
                      title='point in'
                      colorScheme='blue'
                      icon={<MdLocationPin />}
                    />
                  ) : (
                    ""
                  )}
                </Td>
                <Td>
                  {attendace.clockOut
                    ? new Date(attendace.clockOut).toLocaleString("id-ID")
                    : "-"}
                </Td>
                <Td>
                  {attendace.pointOut ? (
                    <IconButton
                      title='point out'
                      colorScheme='blue'
                      icon={<MdLocationPin />}
                    />
                  ) : (
                    "-"
                  )}
                </Td>
                <Td>
                  <IconButton
                    title='clock out'
                    colorScheme='red'
                    icon={<IoExit />}
                    variant='outline'
                    isDisabled={!!attendace.clockOut}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableAttendance;
