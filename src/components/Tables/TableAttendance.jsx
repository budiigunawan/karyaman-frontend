import { useState, useRef } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import { MdLocationPin } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import ModalAttendance from "../Modals/ModalAttendance";
import ModalPoint from "../Modals/ModalPoint";

const TableAttendance = ({ data, revalidateAttendances, currentUser }) => {
  const [clockOutAttendance, setClockOutAttendance] = useState({});
  const [pointAttendance, setPointAttendance] = useState({});
  const cancelRef = useRef();

  const {
    isOpen: isOpenModalClockOutAttendance,
    onOpen: onOpenModalClockOutAttendance,
    onClose: onCloseModalClockOutAttendance,
  } = useDisclosure();
  const {
    isOpen: isOpenModalPoint,
    onOpen: onOpenModalPoint,
    onClose: onCloseModalPoint,
  } = useDisclosure();

  const handleOpenModalClockOutAttendace = (attendace) => {
    setClockOutAttendance(attendace);
    onOpenModalClockOutAttendance();
  };

  const handleCloseModalClockOutAttendace = () => {
    setClockOutAttendance({});
    onCloseModalClockOutAttendance();
  };

  const handleOpenModalPoint = (attendace, type) => {
    setPointAttendance({ type, ...attendace });
    onOpenModalPoint();
  };

  const handleCloseModalPoint = () => {
    setPointAttendance({});
    onCloseModalPoint();
  };

  const isAuthor = (attendanceUserId) => {
    return currentUser.id === attendanceUserId;
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple" colorScheme="blackAlpha">
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
                  <Flex gap={3} alignItems="center">
                    <Avatar name={attendace.user.fullName} src="#" />
                    <Text>{attendace.user.fullName}</Text>
                  </Flex>
                </Td>
                <Td>{attendace.user.role.name}</Td>
                <Td>{new Date(attendace.clockIn).toLocaleString("id-ID")}</Td>
                <Td>
                  {attendace.pointIn ? (
                    <IconButton
                      title="point in"
                      colorScheme="blue"
                      icon={<MdLocationPin />}
                      onClick={() => handleOpenModalPoint(attendace, "in")}
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
                      title="point out"
                      colorScheme="blue"
                      icon={<MdLocationPin />}
                      onClick={() => handleOpenModalPoint(attendace, "out")}
                    />
                  ) : (
                    "-"
                  )}
                </Td>
                <Td>
                  <IconButton
                    title="clock out"
                    colorScheme="red"
                    icon={<IoExit />}
                    variant="outline"
                    onClick={() => handleOpenModalClockOutAttendace(attendace)}
                    isDisabled={
                      !!attendace.clockOut || !isAuthor(attendace?.userId)
                    }
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ModalAttendance
        isOpen={isOpenModalClockOutAttendance}
        onClose={handleCloseModalClockOutAttendace}
        data={clockOutAttendance}
        revalidateAttendances={revalidateAttendances}
      />
      <ModalPoint
        isOpen={isOpenModalPoint}
        cancelRef={cancelRef}
        onClose={handleCloseModalPoint}
        data={pointAttendance}
      />
    </>
  );
};

export default TableAttendance;
