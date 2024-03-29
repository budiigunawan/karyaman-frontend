import { Box, Text, Button, HStack, useDisclosure } from "@chakra-ui/react";
import { usePagination } from "@ajna/pagination";
import Layout from "../components/Layout";
import TablePagination from "../components/Tables/TablePagination";
import TableAttendance from "../components/Tables/TableAttendance";
import { FaPlus } from "react-icons/fa6";
import ModalAttendance from "../components/Modals/ModalAttendance";

const Attendance = () => {
  const {
    pages,
    pagesCount,
    // offset,
    currentPage,
    setCurrentPage,
    // pageSize,
    setPageSize,
  } = usePagination({
    total: 0,
    limits: {
      outer: 1,
      inner: 1,
    },
    initialState: {
      pageSize: 10,
      currentPage: 1,
    },
  });

  const {
    isOpen: isOpenModalCreateAttendance,
    onOpen: onOpenModalCreateAttendance,
    onClose: onCloseModalCreateAttendance,
  } = useDisclosure();

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const attendanceData = [
    {
      id: "1",
      fullName: "Budi Gunawan",
      role: "programmer",
      clockIn: "2024-03-18T02:00:00.000Z",
      pointIn: "POINT(-7.3013141 108.7712909)",
      imgIn: "",
      clockOut: "2024-03-18T10:00:00.000Z",
      pointOut: "POINT(-7.3013141 108.7712909)",
      imgOut: "",
    },
    {
      id: "2",
      fullName: "Budi Gunawan",
      role: "programmer",
      clockIn: "2024-03-19T02:00:00.000Z",
      pointIn: "POINT(-7.3013141 108.7712909)",
      imgIn: "",
      clockOut: "2024-03-19T10:00:00.000Z",
      pointOut: "POINT(-7.3013141 108.7712909)",
      imgOut: "",
    },
    {
      id: "3",
      fullName: "Budi Gunawan",
      role: "programmer",
      clockIn: "2024-03-20T02:00:00.000Z",
      pointIn: "POINT(-7.3013141 108.7712909)",
      imgIn: "",
      clockOut: "",
      pointOut: "",
      imgOut: "",
    },
  ];

  return (
    <Layout>
      <Box padding='22px' backgroundColor='white' borderRadius='15px'>
        <HStack
          width='100%'
          padding='6px 0 22px'
          justifyContent='space-between'
        >
          <Text as='h2' fontWeight='bold' fontSize='large'>
            Attendace Table
          </Text>
          <Button
            leftIcon={<FaPlus />}
            colorScheme='blue'
            onClick={onOpenModalCreateAttendance}
          >
            Attendance
          </Button>
        </HStack>
        <TableAttendance data={attendanceData} />
        <TablePagination
          pages={pages}
          pagesCount={pagesCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </Box>
      <ModalAttendance
        isOpen={isOpenModalCreateAttendance}
        onClose={onCloseModalCreateAttendance}
      />
    </Layout>
  );
};

export default Attendance;
